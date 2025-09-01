package com.ey.model.controller;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ey.model.entity.DimensionMaintenance;
import com.ey.model.entity.DynamicDataDvo;
import com.ey.model.service.DimensionService;
import com.ey.model.service.DynamicTableService;

import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/entity")
public class EntityController {
	
	private static final Logger log = LoggerFactory.getLogger(EntityController.class);
	
	@Autowired
	private DimensionService dimService;
	
    @Autowired
    private DynamicTableService dynamicTableService;
	
	@GetMapping("/getAll")
	public List<DimensionMaintenance> getAllEntities(){
		log.debug("REST request to get all Entity Names");
		return dimService.getAllDimensionDetails();
		
	}
	
	@GetMapping("/data")
	public DynamicDataDvo getData(@RequestParam String tableName, 
            @RequestParam(defaultValue = "1") int page, 
            @RequestParam(defaultValue = "10") int size)
	{
		DynamicDataDvo dataDvo = new DynamicDataDvo();
		List<Map<String, Object>> data = dynamicTableService.getDataFromTable(tableName, page, size);
		int totalRows = dynamicTableService.getTotalRows(tableName);
		int totalPages = (int) Math.ceil((double) totalRows / size);
		dataDvo.setData(data);
		dataDvo.setTotalPages(totalPages);
		dataDvo.setTotalRows(totalRows);
		return dataDvo;
		
		
	}
	
	   @GetMapping("/getTablesWithColumns")
	    public Map<String, List<String>> getTablesWithColumns() {
	        return dimService.getTablesWithColumns();
	    }

}
