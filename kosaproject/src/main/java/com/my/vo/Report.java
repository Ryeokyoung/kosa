package com.my.vo;

public class Report {
	private String reviewNo;
	private String reportDate;
	private String memId;
	private int reportState;
	public String getreviewNo() {
		return reviewNo;
	}
	public void setreviewNo(String reviewNo) {
		this.reviewNo = reviewNo;
	}
	public String getReportDate() {
		return reportDate;
	}
	public void setReportDate(String reportDate) {
		this.reportDate = reportDate;
	}
	public String getMemId() {
		return memId;
	}
	public void setMemId(String memId) {
		this.memId = memId;
	}
	public int getReportState() {
		return reportState;
	}
	public void setReportState(int reportState) {
		this.reportState = reportState;
	}
	public Report(String reviewNo, String reportDate, String memId, int reportState) {
		super();
		this.reviewNo = reviewNo;
		this.reportDate = reportDate;
		this.memId = memId;
		this.reportState = reportState;
	}
	public Report() {
		super();
	}

}
