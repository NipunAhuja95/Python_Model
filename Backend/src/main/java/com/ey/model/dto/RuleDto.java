package com.ey.model.dto;

public class RuleDto {

	private String outputColumn;
	private String tableName;
	private String formula;
	private Integer rowNo;
	public String getOutputColumn() {
		return outputColumn;
	}
	public void setOutputColumn(String outputColumn) {
		this.outputColumn = outputColumn;
	}
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public String getFormula() {
		return formula;
	}
	public void setFormula(String formula) {
		this.formula = formula;
	}
	public Integer getRowNo() {
		return rowNo;
	}
	public void setRowNo(Integer rowNo) {
		this.rowNo = rowNo;
	}
	@Override
	public String toString() {
		return "RuleDto [outputColumn=" + outputColumn + ", tableName=" + tableName + ", formula=" + formula
				+ ", rowNo=" + rowNo + "]";
	}
	
	
	
	
}
