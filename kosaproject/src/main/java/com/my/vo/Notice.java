package com.my.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Notice {
	private int notiNo;
	private String notiDes;
	
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date notiDate;
	
	private String notiId;
	private String notiTitle;
	public int getNotiNo() {
		return notiNo;
	}
	public void setNotiNo(int notiNo) {
		this.notiNo = notiNo;
	}
	public String getNotiDes() {
		return notiDes;
	}
	public void setNotiDes(String notiDes) {
		this.notiDes = notiDes;
	}
	public Date getNotiDate() {
		return notiDate;
	}
	public void setNotiDate(Date notiDate) {
		this.notiDate = notiDate;
	}
	public String getNotiId() {
		return notiId;
	}
	public void setNotiId(String notiId) {
		this.notiId = notiId;
	}
	public String getNotiTitle() {
		return notiTitle;
	}
	public void setNotiTitle(String notiTitle) {
		this.notiTitle = notiTitle;
	}
	public Notice(int notiNo, String notiDes, Date notiDate, String notiId, String notiTitle) {
		super();
		this.notiNo = notiNo;
		this.notiDes = notiDes;
		this.notiDate = notiDate;
		this.notiId = notiId;
		this.notiTitle = notiTitle;
	}
	public Notice() {
		super();
	}
	@Override
	public String toString() {
		return "Notice [notiNo=" + notiNo + ", notiDes=" + notiDes + ", notiDate=" + notiDate + ", notiId=" + notiId
				+ ", notiTitle=" + notiTitle + "]";
	}
	
}
