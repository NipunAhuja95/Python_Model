package com.ey.model.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import com.ey.model.dto.Prompt;
import com.ey.model.dto.RuleDto;
import com.ey.model.exception.CustomException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/rule")
public class DashboardController {

//	@Autowired
//	private RuleCreationService ruleService;

	@Autowired
	private RestTemplate restTemplate;

	@PostMapping("/simulateRule")
	public ResponseEntity<Map<String, Object>> simulateRule(@RequestBody RuleDto rule) {
		try {

			Map<String, Object> response = new HashMap<>();
			System.out.println(rule.toString());
			response.put("message", "Rule simulation  in progress");
			String url = "http://127.0.0.1:5000/simulateRule";

			Map<String, Object> requestBody = new HashMap<>();
			requestBody.put("outputColumn", rule.getOutputColumn());
			requestBody.put("tableName", rule.getTableName());
			requestBody.put("formula", rule.getFormula());
			requestBody.put("rowNo", rule.getRowNo());
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

			ResponseEntity<String> resp = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

			ObjectMapper mapper = new ObjectMapper();
			JsonNode jsonResponse;

			jsonResponse = mapper.readTree(resp.getBody());

			if (jsonResponse.get("data").isEmpty()) {
				response.put("message", "No records found");
				response.put("data", jsonResponse.get("data"));
				System.out.println("Inside no data found");
				System.out.println(response.toString());
				return ResponseEntity.ok(response);
			}

			response.put("message", jsonResponse.get("message").asText());
			response.put("data", jsonResponse.get("data"));

			return ResponseEntity.ok(response);
		} catch (Exception e) {
			throw new CustomException("Failed to simulate rule", e);
		}
	}

	@PostMapping("/checkLLM")
	public ResponseEntity<JsonNode> interactLlm(@RequestBody Prompt prompt) {
		try {
			Map<String, Object> response = new HashMap<>();
			System.out.println(prompt.getPrompt());
			response.put("message", "Rule simulation  in progress");
			String url = "http://127.0.0.1:5000/checkLLM";

			Map<String, Object> requestBody = new HashMap<>();
			requestBody.put("prompt", prompt.getPrompt());
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

			ResponseEntity<String> resp = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
			System.out.println(resp.toString());

			ObjectMapper mapper = new ObjectMapper();
			JsonNode jsonResponse;

			jsonResponse = mapper.readTree(resp.getBody());

			return ResponseEntity.ok(jsonResponse);
		} catch (Exception e) {
			throw new CustomException("Failed to fetch rules", e);
		}
	}
	
	
}
