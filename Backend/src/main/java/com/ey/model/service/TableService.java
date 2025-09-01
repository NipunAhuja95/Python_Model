package com.ey.model.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;

@Service
public class TableService {

	private final DataSource dataSource;

	public TableService(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public List<String> getOutputTables() {
		List<String> outputTables = new ArrayList<>();

		try (Connection connection = dataSource.getConnection()) {
			DatabaseMetaData metaData = connection.getMetaData();
			ResultSet rs = metaData.getTables(connection.getCatalog(), null, "%", new String[] { "TABLE" });

			while (rs.next()) {
				String tableName = rs.getString("TABLE_NAME");
				if (tableName.toLowerCase().endsWith("_output")) {
					outputTables.add(tableName);
				}
			}
		} catch (Exception e) {
			throw new RuntimeException("Error fetching output tables", e);
		}

		return outputTables;
	}
}
