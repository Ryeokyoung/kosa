package com.my.vo;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Store {
	private int stNum;
	private String stDes;
	private int stHits;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="YYYY-MM-dd")
	private Date stDate;
	private String stName;
	private Menu stMenu;
	private List<Menu> stMenuList;
	private double stScore;				//별점
	private String stLoca;
	private String stPhone;
	private int cateNum;
	private String ownerId;
	private int stResNo;
	private int stReviewCnt;
	private int stStatus;
	public int getStNum() {
		return stNum;
	}
	public void setStNum(int stNum) {
		this.stNum = stNum;
	}
	public String getStDes() {
		return stDes;
	}
	public void setStDes(String stDes) {
		this.stDes = stDes;
	}
	public Store() {
		super();
	}
	public Store(int stNum, String stDes, int stHits, Date stDate, String stName, Menu stMenu, List<Menu> stMenuList,
			double stScore, String stLoca, String stPhone, int cateNum, String onerId, int stResNo, int stReviewCnt,
			int stStatus) { 
		super();
		this.stNum = stNum;
		this.stDes = stDes;
		this.stHits = stHits;
		this.stDate = stDate;
		this.stName = stName;
		this.stMenu = stMenu;
		this.stMenuList = stMenuList;
		this.stScore = stScore;
		this.stLoca = stLoca;
		this.stPhone = stPhone;
		this.cateNum = cateNum;
		this.ownerId = onerId;
		this.stResNo = stResNo;
		this.stReviewCnt = stReviewCnt;
		this.stStatus = stStatus;
	}
	public int getStHits() {
		return stHits;
	}
	public void setStHits(int stHits) {
		this.stHits = stHits;
	}
	public Date getStDate() {
		return stDate;
	}
	public void setStDate(Date stDate) {
		this.stDate = stDate;
	}
	public String getStName() {
		return stName;
	}
	public void setStName(String stName) {
		this.stName = stName;
	}
	public Menu getStMenu() {
		return stMenu;
	}
	public void setStMenu(Menu stMenu) {
		this.stMenu = stMenu;
	}
	public List<Menu> getStMenuList() {
		return stMenuList;
	}
	public void setStMenuList(List<Menu> stMenuList) {
		this.stMenuList = stMenuList;
	}
	public double getStScore() {
		return stScore;
	}
	public void setStScore(double stScore) {
		this.stScore = stScore;
	}
	public String getStLoca() {
		return stLoca;
	}
	public void setStLoca(String stLoca) {
		this.stLoca = stLoca;
	}
	public String getStPhone() {
		return stPhone;
	}
	public void setStPhone(String stPhone) {
		this.stPhone = stPhone;
	}
	public int getCateNum() {
		return cateNum;
	}
	public void setCateNum(int cateNum) {
		this.cateNum = cateNum;
	}
	
	public int getStResNo() {
		return stResNo;
	}
	public void setStResNo(int stResNo) {
		this.stResNo = stResNo;
	}
	public int getStReviewCnt() {
		return stReviewCnt;
	}
	public void setStReviewCnt(int stReviewCnt) {
		this.stReviewCnt = stReviewCnt;
	}
	public int getStStatus() {
		return stStatus;
	}
	public void setStStatus(int stStatus) {
		this.stStatus = stStatus;
	}
	public String getOwnerId() {
		return ownerId;
	}
	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}
	@Override
	public String toString() {
		return "Store [stNum=" + stNum + ", stDes=" + stDes + ", stHits=" + stHits + ", stDate=" + stDate + ", stName="
				+ stName + ", stMenu=" + stMenu + ", stMenuList=" + stMenuList + ", stScore=" + stScore + ", stLoca="
				+ stLoca + ", stPhone=" + stPhone + ", cateNum=" + cateNum + ", ownerId=" + ownerId + ", stResNo="
				+ stResNo + ", stReviewCnt=" + stReviewCnt + ", stStatus=" + stStatus + "]";
	}
	

}
