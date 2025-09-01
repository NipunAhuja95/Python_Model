package com.ey.model.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

//ConfigurationRequest.java
@Data
public class ConfigurationRequest {
	private String valuationDate;
	private String projectionTerm;
	private boolean sensitivitiesFlag;
	private boolean reinsuranceFlag;
	private String runType;
	private String targetProfitMarginPricing;
	private String riskDiscountRatePricing;
	private String policyStart;
	private String policyEnd;
	private String outputPath;
	private boolean outputSeriatimFlag;
	private List<String> selectedProducts;

	public String getValuationDate() {
		return valuationDate;
	}

	public void setValuationDate(String valuationDate) {
		this.valuationDate = valuationDate;
	}

	public String getProjectionTerm() {
		return projectionTerm;
	}

	public void setProjectionTerm(String projectionTerm) {
		this.projectionTerm = projectionTerm;
	}

	public boolean isSensitivitiesFlag() {
		return sensitivitiesFlag;
	}

	public void setSensitivitiesFlag(boolean sensitivitiesFlag) {
		this.sensitivitiesFlag = sensitivitiesFlag;
	}

	public boolean isReinsuranceFlag() {
		return reinsuranceFlag;
	}

	public void setReinsuranceFlag(boolean reinsuranceFlag) {
		this.reinsuranceFlag = reinsuranceFlag;
	}

	public String getRunType() {
		return runType;
	}

	public void setRunType(String runType) {
		this.runType = runType;
	}

	public String getTargetProfitMarginPricing() {
		return targetProfitMarginPricing;
	}

	public void setTargetProfitMarginPricing(String targetProfitMarginPricing) {
		this.targetProfitMarginPricing = targetProfitMarginPricing;
	}

	public String getRiskDiscountRatePricing() {
		return riskDiscountRatePricing;
	}

	public void setRiskDiscountRatePricing(String riskDiscountRatePricing) {
		this.riskDiscountRatePricing = riskDiscountRatePricing;
	}

	public String getPolicyStart() {
		return policyStart;
	}

	public void setPolicyStart(String policyStart) {
		this.policyStart = policyStart;
	}

	public String getPolicyEnd() {
		return policyEnd;
	}

	public void setPolicyEnd(String policyEnd) {
		this.policyEnd = policyEnd;
	}

	public String getOutputPath() {
		return outputPath;
	}

	public void setOutputPath(String outputPath) {
		this.outputPath = outputPath;
	}

	public boolean isOutputSeriatimFlag() {
		return outputSeriatimFlag;
	}

	public void setOutputSeriatimFlag(boolean outputSeriatimFlag) {
		this.outputSeriatimFlag = outputSeriatimFlag;
	}

	public List<String> getSelectedProducts() {
		return selectedProducts;
	}

	public void setSelectedProducts(List<String> selectedProducts) {
		this.selectedProducts = selectedProducts;
	}

}
