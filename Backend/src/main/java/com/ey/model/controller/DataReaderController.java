package com.ey.model.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.ey.model.service.DimensionService;
import com.ey.model.service.FileService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.Strictness;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DataReaderController {
	
	@Autowired
	DimensionService dimensionService;
	
	@Autowired
	private FileService fileService;

	private final Gson gson = new Gson();

	GsonBuilder gsonBuilder = new GsonBuilder();

	@PostMapping(value = "/upload", consumes = "multipart/form-data")
	public ResponseEntity<String> fetchExcelData(@RequestPart("file") MultipartFile file,
			@RequestParam("columns") String columns,
			@RequestParam("data") String data,
			@RequestParam("tableName") String tableName) {

		// Process the file and the incoming data
		System.out.println("Received file: " + file.getOriginalFilename());
		System.out.println("Received table name: " + tableName);
		System.out.println("Received columns: " + columns);
		System.out.println("Received data: " + data);

		gsonBuilder.setStrictness(Strictness.LENIENT);
		HashMap<String, Object> columnsMap = gsonBuilder.create().fromJson(columns, HashMap.class);
		HashMap<String, Object> dataMap = gsonBuilder.create().fromJson(data, HashMap.class);
		System.out.println(columnsMap);
		System.out.println(dataMap);

		dimensionService.createUploadDimensionDetails(file, columnsMap, dataMap, tableName);
		return new ResponseEntity<>("Entity Created", HttpStatus.OK);
	}

	@GetMapping("/files")
	public List<String> getFiles() {
		return fileService.listFiles();
	}

	@GetMapping("/file-headers")
	public Map<String, String> getFileHeaders(@RequestParam String fileName)
			throws IOException, CsvValidationException {
		return fileService.getColumnHeadersAndTypes(fileName);
	}

	@PostMapping("/upload-file")
	public ResponseEntity<Map<String, Object>> uploadFile(@RequestBody Map<String, Object> payload)
			throws IOException, CsvValidationException {
		String fileName = (String) payload.get("fileName");
		String tableName = (String) payload.get("tableName");
		Map<String, Map<String, String>> columnMappings = (Map<String, Map<String, String>>) payload
				.get("columnMappings");
		Map<String, Object> response = new HashMap<>();
		// First check if the same table is already present in the db or not.
		boolean exists = fileService.doesTableExists(tableName);

		if (exists) {

			// now delete the data from the table and then insert the new data.
			fileService.replaceTableData(tableName);
			System.out.println("Table data deleted/dropped");
			fileService.createTableAndUploadData(fileName, tableName, columnMappings);
			response.put("message", "Sequence saved successfully");

		} else {
			fileService.createTableAndUploadData(fileName, tableName, columnMappings);
			response.put("message", "Sequence saved successfully");
		}

		return ResponseEntity.ok(response);

	}
}
