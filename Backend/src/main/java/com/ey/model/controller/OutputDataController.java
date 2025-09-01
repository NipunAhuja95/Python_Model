package com.ey.model.controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import com.ey.model.service.TableService;
import com.ey.model.entity.DynamicDataDvo;
import com.ey.model.service.DynamicTableService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/output-tables")
public class OutputDataController {

	private final TableService tableService;
	private final DynamicTableService dynamicTableService;

	public OutputDataController(TableService tableService, DynamicTableService dynamicTableService) {
		this.tableService = tableService;
		this.dynamicTableService = dynamicTableService;
	}

	// 1. List all *_output tables
	@GetMapping
	public List<String> getOutputTables() {
		return tableService.getOutputTables();
	}

	// 2. Get data from one *_output table with pagination
	@GetMapping("/data")
	public DynamicDataDvo getData(@RequestParam String tableName,
			@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int size) {
		DynamicDataDvo dataDvo = new DynamicDataDvo();

		List<Map<String, Object>> data = dynamicTableService.getDataFromTable(tableName, page, size);
		int totalRows = dynamicTableService.getTotalRows(tableName);
		int totalPages = (int) Math.ceil((double) totalRows / size);

		dataDvo.setData(data);
		dataDvo.setTotalRows(totalRows);
		dataDvo.setTotalPages(totalPages);
		dataDvo.setColumns(dynamicTableService.getColumnNames(tableName)); // send columns too

		return dataDvo;
	}
}
