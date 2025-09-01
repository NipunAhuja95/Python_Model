package com.ey.model.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import com.ey.model.dto.ConfigurationRequest;
import com.ey.model.entity.Configuration;
import com.ey.model.repository.ConfigurationRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/configurations")
@RequiredArgsConstructor
public class ConfigController {

    @Autowired
    private ConfigurationRepository repo;

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping
    public ResponseEntity<?> saveAndTrigger(@RequestBody ConfigurationRequest request) {

        // ✅ Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String submittedBy = (authentication != null && authentication.isAuthenticated()) ? authentication.getName() : "anonymous";

        // 🔁 Manual Mapping
        Configuration config = new Configuration();
        config.setValuationDate(request.getValuationDate());
        config.setProjectionTerm(request.getProjectionTerm());
        config.setSensitivitiesFlag(request.isSensitivitiesFlag());
        config.setReinsuranceFlag(request.isReinsuranceFlag());
        config.setRunType(request.getRunType());
        config.setTargetProfitMarginPricing(request.getTargetProfitMarginPricing());
        config.setRiskDiscountRatePricing(request.getRiskDiscountRatePricing());
        config.setPolicyStart(request.getPolicyStart());
        config.setPolicyEnd(request.getPolicyEnd());
        config.setOutputPath(request.getOutputPath());
        config.setOutputSeriatimFlag(request.isOutputSeriatimFlag());

        // ✅ Support multiple selected products
        config.setSelectedProducts(request.getSelectedProducts());  // This should be List<String> in DTO + Entity

        config.setSubmittedBy(submittedBy);
        config.setSubmittedAt(LocalDateTime.now());

        // 💾 Save to DB
        Configuration saved = repo.save(config);

        // 🔁 Call Python
        String pythonUrl = "http://192.168.1.205:5000/execute"; // replace if needed
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity<ConfigurationRequest> entity = new HttpEntity<>(request, headers);
        
        ResponseEntity<String> response = restTemplate.postForEntity(pythonUrl, entity, String.class);

        // ✅ Return Python result + DB ID
        Map<String, Object> result = new HashMap<>();
        result.put("dbId", saved.getId());
        result.put("pythonResponse", response.getBody());

        return ResponseEntity.ok(result);
    }
}
