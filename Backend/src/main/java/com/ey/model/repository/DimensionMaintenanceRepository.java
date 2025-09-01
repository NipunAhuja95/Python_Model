package com.ey.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ey.model.entity.DimensionMaintenance;


public interface DimensionMaintenanceRepository  extends JpaRepository<DimensionMaintenance, Long>{
	
	void deleteByDimensionTableName(String tableName);

}
