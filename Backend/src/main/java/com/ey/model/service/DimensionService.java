package com.ey.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ey.model.entity.DimensionMaintenance;
import com.ey.model.entity.DimensionMaintenanceColumns;
import com.ey.model.repository.DimensionMaintenanceColumnsRepository;
import com.ey.model.repository.DimensionMaintenanceRepository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class DimensionService {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private EntityManager entityManager;

	@Autowired
	private DimensionMaintenanceRepository dimensionMaintenanceRepository;

	@Autowired
	private DimensionMaintenanceColumnsRepository dimensionMaintenanceColumnsRepository;

	public List<DimensionMaintenance> getAllDimensionDetails() {
		return dimensionMaintenanceRepository.findAll();
	}

	public DimensionMaintenance findById(Long id) {
		return dimensionMaintenanceRepository.getById(id);
	}

	public void createUploadDimensionDetails(MultipartFile file,HashMap<String, Object>
	  columns, HashMap<String, Object> data, String tableName) {
		
	  DimensionMaintenance dimensionMaintenance = new DimensionMaintenance();
	  
	  dimensionMaintenance.setDimensionTableName(tableName);
	  dimensionMaintenance.setDimensionType(0); // 0 upload & 2 manual
	  dimensionMaintenanceRepository.save(dimensionMaintenance);
	  
	  StringBuilder createTableQuery = new
	  StringBuilder("CREATE TABLE IF NOT EXISTS "+tableName+" (");
	  
	  StringBuilder insertTableQuery = new
	  StringBuilder("Insert Into "+tableName+" (	");
	  
	  DimensionMaintenanceColumns dimensionMaintenanceColumns = new
	  DimensionMaintenanceColumns(); String columnName = "" ; String columnDataType
	  = "";
	  
	  createTableQuery.append(tableName).append("_id").
	  append(" INT AUTO_INCREMENT , ");
	  createTableQuery.append("PRIMARY KEY (").append(tableName).append("_id").
	  append(") , ");
	  
	  dimensionMaintenanceColumns.setDimensionMaintenance(dimensionMaintenance);
	  dimensionMaintenanceColumns.setDimensionTableName(tableName);
	  dimensionMaintenanceColumns.setDimensionColumnName(tableName+"_id");
	  dimensionMaintenanceColumns.setDimensionColumnDataType("INT");
	  dimensionMaintenanceColumnsRepository.save(dimensionMaintenanceColumns);
	  
	  HashMap<String, String> mappedData = new HashMap<String, String>();
	  
	  String col = "";
	  String dt = "";
		
	}
	
    public Map<String, List<String>> getTablesWithColumns() {
        List<DimensionMaintenanceColumns> tableColumns = dimensionMaintenanceColumnsRepository.findAll();

        return tableColumns.stream()
                .collect(Collectors.groupingBy(
                		DimensionMaintenanceColumns::getDimensionTableName,
                        Collectors.mapping(DimensionMaintenanceColumns::getDimensionColumnName, Collectors.toList())
                ));
    }
}
			 
		
