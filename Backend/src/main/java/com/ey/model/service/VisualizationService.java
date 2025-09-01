package com.ey.model.service;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.*;

@Service
@RequiredArgsConstructor
public class VisualizationService {

	@Autowired
    private JdbcTemplate jdbcTemplate;

    // allow only [A-Za-z_0-9] and must start with a letter
    private boolean safeIdentifier(String s) {
        return s != null && s.matches("^[A-Za-z][A-Za-z0-9_]*$");
    }

    private Set<String> getColumnsForTable(Connection conn, String tableName) throws SQLException {
        Set<String> result = new HashSet<>();
        DatabaseMetaData md = conn.getMetaData();
        try (ResultSet rs = md.getColumns(conn.getCatalog(), null, tableName, null)) {
            while (rs.next()) {
                result.add(rs.getString("COLUMN_NAME"));
            }
        }
        return result;
    }

    private boolean tableExists(Connection conn, String tableName) throws SQLException {
        DatabaseMetaData md = conn.getMetaData();
        try (ResultSet rs = md.getTables(conn.getCatalog(), null, tableName, new String[]{"TABLE"})) {
            return rs.next();
        }
    }

    public Map<String, Object> getChartData(String tableName, String xColumn, String yColumn, String chartType) {
        Map<String, Object> out = new HashMap<>();
        out.put("columns", List.of(xColumn, yColumn));
        out.put("chartType", chartType);

        try (Connection conn = Objects.requireNonNull(jdbcTemplate.getDataSource()).getConnection()) {
            if (!safeIdentifier(tableName) || !safeIdentifier(xColumn) || !safeIdentifier(yColumn)) {
                throw new IllegalArgumentException("Unsafe identifier detected");
            }
            if (!tableExists(conn, tableName)) {
                throw new IllegalArgumentException("Table not found: " + tableName);
            }
            Set<String> cols = getColumnsForTable(conn, tableName);
            if (!cols.contains(xColumn) || !cols.contains(yColumn)) {
                throw new IllegalArgumentException("Column not found in table");
            }

            // Simple raw rows: SELECT x,y FROM table
            String sql = "SELECT " + xColumn + " AS " + xColumn + ", " + yColumn + " AS " + yColumn + " FROM " + tableName;
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

            out.put("data", rows);
            return out;
        } catch (SQLException e) {
            throw new RuntimeException("DB error", e);
        }
    }
}




