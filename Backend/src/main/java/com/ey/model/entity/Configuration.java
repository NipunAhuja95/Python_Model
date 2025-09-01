package com.ey.model.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "configurations")
@Data
public class Configuration {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JsonProperty("Valuation_Date")
	private String valuationDate;

	@JsonProperty("Projection_Term")
	private String projectionTerm;

	@JsonProperty("Sensitivities_Flag")
	private boolean sensitivitiesFlag;

	@JsonProperty("Reinsurance_Flag")
	private boolean reinsuranceFlag;

	@JsonProperty("Run_Type")
	private String runType;

	@JsonProperty("Target_Profit_Margin_Pricing")
	private String targetProfitMarginPricing;

	@JsonProperty("Risk_Discount_Rate_Pricing")
	private String riskDiscountRatePricing;

	@JsonProperty("Policy_start")
	private String policyStart;

	@JsonProperty("Policy_end")
	private String policyEnd;

	@JsonProperty("Output_path")
	private String outputPath;

	@JsonProperty("Output_seratim_cf_flag")
	private boolean outputSeriatimFlag;
	@ElementCollection
	@CollectionTable(name = "configurations_selected_products", // ✅ match your existing table name
			joinColumns = @JoinColumn(name = "configuration_id") // ✅ matches your FK column
	)
	@Column(name = "selected_products") // ✅ matches your table's column name
	private List<String> selectedProducts;

	private String submittedBy; // user's email or ID

	private LocalDateTime submittedAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public String getSubmittedBy() {
		return submittedBy;
	}

	public void setSubmittedBy(String submittedBy) {
		this.submittedBy = submittedBy;
	}

	public LocalDateTime getSubmittedAt() {
		return submittedAt;
	}

	public void setSubmittedAt(LocalDateTime submittedAt) {
		this.submittedAt = submittedAt;
	}
}
