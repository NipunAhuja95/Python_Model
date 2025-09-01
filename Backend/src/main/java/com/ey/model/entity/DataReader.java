package com.ey.model.entity;

import java.util.HashMap;

public class DataReader {
	
	
	    private String filePath;
	    private String fileName;
	    private HashMap<String, String> columnDataTypes;
		public String getFilePath() {
			return filePath;
		}
		public void setFilePath(String filePath) {
			this.filePath = filePath;
		}
		public String getFileName() {
			return fileName;
		}
		public void setFileName(String fileName) {
			this.fileName = fileName;
		}
		public HashMap<String, String> getColumnDataTypes() {
			return columnDataTypes;
		}
		public void setColumnDataTypes(HashMap<String, String> columnDataTypes) {
			this.columnDataTypes = columnDataTypes;
		}

	
}
