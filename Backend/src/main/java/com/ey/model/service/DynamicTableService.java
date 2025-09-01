package com.ey.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

@Service
public class DynamicTableService {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private EntityManager entityManager;

	public List<Map<String, Object>> getDataFromTable(String tableName, int page, int size) {
		int offset = (page - 1) * size;
		String sql = "SELECT * FROM " + tableName + " LIMIT " + size + " OFFSET " + offset;
		System.out.println(sql);
		return jdbcTemplate.queryForList(sql);
	}

	public int getTotalRows(String tableName) {
		String sql = "SELECT COUNT(*) FROM " + tableName;
		return jdbcTemplate.queryForObject(sql, Integer.class);
	}

	public List<String> getColumnNames(String tableName) {
		String queryStr = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = :tableName order by ORDINAL_POSITION";
		Query query = entityManager.createNativeQuery(queryStr);
		query.setParameter("tableName", tableName);
		return query.getResultList();
	}
}
