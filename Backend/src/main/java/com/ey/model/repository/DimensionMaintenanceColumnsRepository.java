package com.ey.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ey.model.entity.DimensionMaintenanceColumns;


public interface DimensionMaintenanceColumnsRepository extends JpaRepository<DimensionMaintenanceColumns, Long>{
	
	void deleteByDimensionTableName(String tableName);

}
