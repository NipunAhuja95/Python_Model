package com.ey.model.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ey.model.entity.DimensionMaintenance;
import com.ey.model.entity.DimensionMaintenanceColumns;
import com.ey.model.repository.DimensionMaintenanceColumnsRepository;
import com.ey.model.repository.DimensionMaintenanceRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.sql.DataSource;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

@Service
public class FileService {

	@Value("${file.location}")
    private String fileLocation;
	
	private final JdbcTemplate jdbcTemplate;
	
	private Map<String, Integer> columnIndexMap;
	
	@Autowired
	private DataSource dataSource;
	
    public FileService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
@Autowired
	private DimensionMaintenanceRepository dimensionMaintenanceRepository;
	
	@Autowired
	private DimensionMaintenanceColumnsRepository dimensionMaintenanceColumnsRepository;
		
    public List<String> listFiles() {
    	System.out.println(fileLocation);
        File folder = new File(fileLocation);
        return Arrays.stream(folder.listFiles())
                     .filter(File::isFile)
                     .map(File::getName)
                     .collect(Collectors.toList());
    }
    
    
    
    public Map<String, String> getColumnHeadersAndTypes(String fileName) throws IOException, CsvValidationException {
        File file = new File(fileLocation + "\\" + fileName);
        if (fileName.endsWith(".xlsx") || fileName.endsWith(".XLSX")) {
            return getExcelHeadersAndTypes(file);
        } else if (fileName.endsWith(".csv")) {
            return getCsvHeadersAndTypes(file);
        } else {
            throw new IllegalArgumentException("Unsupported file type");
        }
    }
    
    private Map<String, String> getExcelHeadersAndTypes(File file) throws IOException {
        Map<String, String> headersAndTypes = new LinkedHashMap<>();
        try (FileInputStream fis = new FileInputStream(file);
             Workbook workbook = new XSSFWorkbook(fis)) {
            Sheet sheet = workbook.getSheetAt(0);
            Row headerRow = sheet.getRow(0);
            Row dataRow = sheet.getRow(1);

            for (Cell cell : headerRow) {
                String header = cell.getStringCellValue();
                Cell dataCell = dataRow.getCell(cell.getColumnIndex());
                String dataType = getSqlDataType(dataCell);
                headersAndTypes.put(header, dataType);
            }
        }
        return headersAndTypes;
    }

    private Map<String, String> getCsvHeadersAndTypes(File file) throws IOException, CsvValidationException {
        Map<String, String> headersAndTypes = new LinkedHashMap<>();
        try (CSVReader csvReader = new CSVReader(new FileReader(file, StandardCharsets.UTF_8))) {
            String[] headers = csvReader.readNext();
            String[] dataRow = csvReader.readNext();

            for (int i = 0; i < headers.length; i++) {
                String header = headers[i];
                String dataType = getSqlDataType(dataRow[i]);
                headersAndTypes.put(header, dataType);
            }
        }
        return headersAndTypes;
    }

    private String getSqlDataType(Cell cell) {
    	if(cell == null) {
    		return "VARCHAR";
    	}
        switch (cell.getCellType()) {
            case STRING:
                return "VARCHAR";
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return "TIMESTAMP";
                } else {
                    return "DOUBLE";
                }
            case BOOLEAN:
                return "BOOLEAN";
            default:
                return "VARCHAR";
        }
    }

    private String getSqlDataType(String value) {
        if (value.matches("\\d+")) {
            return "INT";
        } else if (value.matches("\\d+\\.\\d+")) {
            return "DOUBLE";
        } else if (value.matches("\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}")) {
            return "TIMESTAMP";
        } else if (value.matches("\\d{4}-\\d{2}-\\d{2}")) {
            return "DATE";
        } else {
            return "VARCHAR";
        }
    }
    
    @Transactional
    public void createTableAndUploadData(String fileName, String tableName, Map<String, Map<String, String>> columnMappings) throws IOException, CsvValidationException {
        File file = new File(fileLocation + "\\" + fileName);
        if (fileName.endsWith(".xlsx") || fileName.endsWith(".XLSX")) {
            processExcelFile(file, tableName, columnMappings);
        } else if (fileName.endsWith(".csv")) {
            processCsvFile(file, tableName, columnMappings);
        } else {
            throw new IllegalArgumentException("Unsupported file type");
        }
    }

    private void processExcelFile(File file, String tableName, Map<String, Map<String, String>> columnMappings) throws IOException {
        try (FileInputStream fis = new FileInputStream(file);
             Workbook workbook = new XSSFWorkbook(fis)) {
            Sheet sheet = workbook.getSheetAt(0);
            Row headerRow = sheet.getRow(0);

            // Initialize column index map
            columnIndexMap = new HashMap<>();
            for (Cell cell : headerRow) {
                columnIndexMap.put(cell.getStringCellValue(), cell.getColumnIndex());
            }

            String createTableQuery = buildCreateTableQuery(tableName, columnMappings, sheet);
            jdbcTemplate.execute(createTableQuery);

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                String insertQuery = buildInsertQuery(tableName, columnMappings, row);
                jdbcTemplate.execute(insertQuery);
            }
           saveDimensionDetails(tableName, columnMappings);
        }
    }

    private void processCsvFile(File file, String tableName, Map<String, Map<String, String>> columnMappings) throws IOException, CsvValidationException {
        try (CSVReader csvReader = new CSVReader(new FileReader(file, StandardCharsets.UTF_8))) {
            String[] headers = csvReader.readNext();

            // Initialize column index map
            columnIndexMap = new HashMap<>();
            for (int i = 0; i < headers.length; i++) {
                columnIndexMap.put(headers[i], i);
            }

            String createTableQuery = buildCreateTableQuery(tableName, columnMappings, csvReader);
            jdbcTemplate.execute(createTableQuery);

            String[] dataRow;
            while ((dataRow = csvReader.readNext()) != null) {
                String insertQuery = buildInsertQuery(tableName, columnMappings, dataRow);
                jdbcTemplate.execute(insertQuery);
            }
            saveDimensionDetails(tableName, columnMappings);
        }
    }

    private String buildCreateTableQuery(String tableName, Map<String, Map<String, String>> columnMappings, Sheet sheet) {
        StringBuilder query = new StringBuilder("CREATE TABLE " + tableName + " (");
        columnMappings.forEach((original, details) -> {
            String dataType = details.get("dataType");
            if (dataType.startsWith("VARCHAR")) {
                int maxLength = getMaxLength(sheet, columnIndexMap.get(original));
                dataType = "VARCHAR(" + maxLength + ")";
            }
            query.append(details.get("newName")).append(" ").append(dataType).append(", ");
        });
        query.setLength(query.length() - 2); // Remove the last comma and space
        query.append(")");
        return query.toString();
    }

    private String buildCreateTableQuery(String tableName, Map<String, Map<String, String>> columnMappings, CSVReader csvReader) throws IOException {
        StringBuilder query = new StringBuilder("CREATE TABLE " + tableName + " (");
        columnMappings.forEach((original, details) -> {
            String dataType = details.get("dataType");
            if (dataType.startsWith("VARCHAR")) {
                int maxLength=0;
				try {
					maxLength = getMaxLength(csvReader, columnIndexMap.get(original));
				} catch (CsvValidationException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
                dataType = "VARCHAR(" + maxLength + ")";
            }
            query.append(details.get("newName")).append(" ").append(dataType).append(", ");
        });
        query.setLength(query.length() - 2); // Remove the last comma and space
        query.append(")");
        return query.toString();
    }

    private int getMaxLength(Sheet sheet, int columnIndex) {
        int maxLength = 0;
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            Cell cell = row.getCell(columnIndex);
            if (cell != null && cell.getCellType() == CellType.STRING) {
                maxLength = Math.max(maxLength, cell.getStringCellValue().length());
            }
        }
        return maxLength + 10; // Add a buffer
    }

    private int getMaxLength(CSVReader csvReader, int columnIndex) throws IOException, CsvValidationException {
        int maxLength = 0;
        String[] dataRow;
        while ((dataRow = csvReader.readNext()) != null) {
            maxLength = Math.max(maxLength, dataRow[columnIndex].length());
        }
        return maxLength + 10; // Add a buffer
    }

    public void saveDimensionDetails(String tableName, Map<String, Map<String, String>> columnMappings) {
    	
    	dimensionMaintenanceColumnsRepository.deleteByDimensionTableName(tableName);
        dimensionMaintenanceRepository.deleteByDimensionTableName(tableName);
        
    	DimensionMaintenance dimensionMaintenance = new DimensionMaintenance();
    	dimensionMaintenance.setDimensionTableName(tableName);
    	dimensionMaintenance.setDimensionType(0);
		dimensionMaintenanceRepository.save(dimensionMaintenance);
        columnMappings.forEach((original, details) -> {
        	DimensionMaintenanceColumns dimensionMaintenanceColumns = new DimensionMaintenanceColumns();
           
            dimensionMaintenanceColumns.setDimensionMaintenance(dimensionMaintenance);
			dimensionMaintenanceColumns.setDimensionTableName(tableName);
			dimensionMaintenanceColumns.setDimensionColumnName(details.get("newName"));
			dimensionMaintenanceColumns.setDimensionColumnDataType(details.get("dataType"));
			dimensionMaintenanceColumnsRepository.save(dimensionMaintenanceColumns);
            
        });
		
    }

    private String buildInsertQuery(String tableName, Map<String, Map<String, String>> columnMappings, Row row) {
    	
        StringBuilder query = new StringBuilder("INSERT INTO " + tableName + " (");
        columnMappings.forEach((original, details) -> query.append(details.get("newName")).append(", "));
        query.setLength(query.length() - 2); // Remove the last comma and space
        query.append(") VALUES (");
        columnMappings.forEach((original, details) -> {
            Cell cell = row.getCell(getColumnIndex(original));
            Object value = getCellValue(cell);
            if(value == null || (value instanceof String && ((String) value).isEmpty())) {
            	query.append("NULL, ");
            }else if (value instanceof String || value instanceof java.sql.Date) {
                query.append("'").append(value).append("', ");
            } else {
                query.append(value).append(", ");
            }
        });
        query.setLength(query.length() - 2); // Remove the last comma and space
        query.append(")");
        return query.toString();
    }

    private String buildInsertQuery(String tableName, Map<String, Map<String, String>> columnMappings, String[] dataRow) {
        StringBuilder query = new StringBuilder("INSERT INTO " + tableName + " (");
        columnMappings.forEach((original, details) -> query.append(details.get("newName")).append(", "));
        query.setLength(query.length() - 2); // Remove the last comma and space
        query.append(") VALUES (");
        columnMappings.forEach((original, details) -> {
            int index = getColumnIndex(original);
            query.append("'").append(dataRow[index]).append("', ");
        });
        query.setLength(query.length() - 2); // Remove the last comma and space
        query.append(")");
        return query.toString();
    }

    private int getColumnIndex(String columnName) {
        return columnIndexMap.getOrDefault(columnName, -1);
    }

    private Object getCellValue(Cell cell) {
    	if(cell == null) {
    		return null;
    	}
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                	return new java.sql.Date(cell.getDateCellValue().getTime());
                } else {
                    return Double.toString(cell.getNumericCellValue());
                }
            case BOOLEAN:
                return Boolean.toString(cell.getBooleanCellValue());
            default:
                return null;
        }
    }
    
    public boolean doesTableExists(String tableName) {
    	try (Connection con = dataSource.getConnection()) {
    		
    		DatabaseMetaData metaData = con.getMetaData();    
    		
    		try(ResultSet rs = metaData.getTables(null, null, tableName, new String[] {"TABLE"})){
    			return rs.next();
    		}
    		
    		
    	} catch (SQLException e){
    		e.printStackTrace();
    		return false;
    	}
    }
    
    
    public void replaceTableData(String tableName) {
    	String deleteQuery = "DROP TABLE IF EXISTS " + tableName;
    	jdbcTemplate.execute(deleteQuery);
    }

}