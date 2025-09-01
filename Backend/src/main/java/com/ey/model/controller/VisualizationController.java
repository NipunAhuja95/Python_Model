package com.ey.model.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.ey.model.service.VisualizationService;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/visualize")
public class VisualizationController {

	@Autowired
    private VisualizationService visualizationService;

    @GetMapping("/data")
    public ResponseEntity<Map<String, Object>> getVisualizationData(
            @RequestParam String tableName,
            @RequestParam String xColumn,
            @RequestParam String yColumn,
            @RequestParam(defaultValue = "Bar") String chartType
    ) {
        return ResponseEntity.ok(
                visualizationService.getChartData(tableName, xColumn, yColumn, chartType)
        );
    }
}


