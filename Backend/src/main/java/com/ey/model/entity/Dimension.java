package com.ey.model.entity;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="dimension")
public class Dimension {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_DIMENSION")
    private Long id;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "description")
    private String description;
    
    @Column(name = "element_table_name")
    private String elementTableName;
    
    @Column(name = "hierarchy_table_name")
    private String hierarchyTableName;
    
    @Column(name = "hierarchy_closure_table")
    private String hierarchyClosureTable;
    
    @Column(name="element_node_table")
    private String elementNodeTable;
    
    @Column(name = "active_status")
    private int activeStatus;
    
    @Column(name="created_date")
    private Instant createdDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getElementTableName() {
		return elementTableName;
	}

	public void setElementTableName(String elementTableName) {
		this.elementTableName = elementTableName;
	}

	public String getHierarchyTableName() {
		return hierarchyTableName;
	}

	public void setHierarchyTableName(String hierarchyTableName) {
		this.hierarchyTableName = hierarchyTableName;
	}

	public String getHierarchyClosureTable() {
		return hierarchyClosureTable;
	}

	public void setHierarchyClosureTable(String hierarchyClosureTable) {
		this.hierarchyClosureTable = hierarchyClosureTable;
	}
	

	public String getElementNodeTable() {
		return elementNodeTable;
	}

	public void setElementNodeTable(String elementNodeTable) {
		this.elementNodeTable = elementNodeTable;
	}

	public int getActiveStatus() {
		return activeStatus;
	}

	public void setActiveStatus(int activeStatus) {
		this.activeStatus = activeStatus;
	}

	public Instant getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Instant createdDate) {
		this.createdDate = createdDate;
	}
    
    
    
}
