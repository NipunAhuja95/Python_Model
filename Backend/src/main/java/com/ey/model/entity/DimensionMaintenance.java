package com.ey.model.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "dimension_maintenance")
public class DimensionMaintenance {

	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dimension_maintenance_id")
    private Long dimensionMaintenanceId;
	
	@Column(name = "dimension_table_name", unique = true)
	private String dimensionTableName;
	
	@Column(name = "dimension_type")
	private Integer dimensionType;
	
	@OneToMany(mappedBy = "dimensionMaintenance")
	@JsonManagedReference
	List<DimensionMaintenanceColumns> dimensionMaintenanceColumns;

	public Long getDimensionMaintenanceId() {
		return dimensionMaintenanceId;
	}

	public void setDimensionMaintenanceId(Long dimensionMaintenanceId) {
		this.dimensionMaintenanceId = dimensionMaintenanceId;
	}

	public String getDimensionTableName() {
		return dimensionTableName;
	}

	public void setDimensionTableName(String dimensionTableName) {
		this.dimensionTableName = dimensionTableName;
	}

	public Integer getDimensionType() {
		return dimensionType;
	}

	public void setDimensionType(Integer dimensionType) {
		this.dimensionType = dimensionType;
	}

	public List<DimensionMaintenanceColumns> getDimensionMaintenanceColumns() {
		return dimensionMaintenanceColumns;
	}

	public void setDimensionMaintenanceColumns(List<DimensionMaintenanceColumns> dimensionMaintenanceColumns) {
		this.dimensionMaintenanceColumns = dimensionMaintenanceColumns;
	}
	
	
	
	
}
