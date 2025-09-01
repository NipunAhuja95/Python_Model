package com.ey.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "dimension_maintenance_columns")
public class DimensionMaintenanceColumns {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dimension_maintenance_columns_id")
    private Long dimensionMaintenanceColumnsId;
	
	@Column(name = "dimension_maintenance_tablename")
	private String dimensionTableName;
	
	@Column(name = "dimension_column_name")
	private String dimensionColumnName;
	
	@Column(name = "dimension_column_data_type")
	private String dimensionColumnDataType;
	
	@ManyToOne
    @JoinColumn(name = "dimension_maintenance_id")
	@JsonBackReference
	private DimensionMaintenance dimensionMaintenance;

	public Long getDimensionMaintenanceColumnsId() {
		return dimensionMaintenanceColumnsId;
	}

	public void setDimensionMaintenanceColumnsId(Long dimensionMaintenanceColumnsId) {
		this.dimensionMaintenanceColumnsId = dimensionMaintenanceColumnsId;
	}

	public String getDimensionTableName() {
		return dimensionTableName;
	}

	public void setDimensionTableName(String dimensionTableName) {
		this.dimensionTableName = dimensionTableName;
	}

	public String getDimensionColumnName() {
		return dimensionColumnName;
	}

	public void setDimensionColumnName(String dimensionColumnName) {
		this.dimensionColumnName = dimensionColumnName;
	}

	public String getDimensionColumnDataType() {
		return dimensionColumnDataType;
	}

	public void setDimensionColumnDataType(String dimensionColumnDataType) {
		this.dimensionColumnDataType = dimensionColumnDataType;
	}

	public DimensionMaintenance getDimensionMaintenance() {
		return dimensionMaintenance;
	}

	public void setDimensionMaintenance(DimensionMaintenance dimensionMaintenance) {
		this.dimensionMaintenance = dimensionMaintenance;
	}
	
	
	
	

}
