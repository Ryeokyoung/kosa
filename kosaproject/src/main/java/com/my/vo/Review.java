package com.my.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.my.dto.PageBean;

public class Review {
	private int reviewNo;
	private String reviewDes;
	private int reviewStar;
	private int stNum;
	private String memId;
	private int reviewState;
	private String memNick;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
	private java.util.Date reviewDate;

	public Review() {
		super();
	}

	public Review(int reviewNo, String reviewDes, int reviewStar, int stNum, String memId, int reviewState,
			String memNick, Date reviewDate) {
		super();
		this.reviewNo = reviewNo;
		this.reviewDes = reviewDes;
		this.reviewStar = reviewStar;
		this.stNum = stNum;
		this.memId = memId;
		this.reviewState = reviewState;
		this.memNick = memNick;
		this.reviewDate = reviewDate;
	}

	
	public String getMemNick() {
		return memNick;
	}

	public void setMemNick(String memNick) {
		this.memNick = memNick;
	}

	public int getReviewNo() {
		return reviewNo;
	}

	public void setReviewNo(int reviewNo) {
		this.reviewNo = reviewNo;
	}

	public String getReviewDes() {
		return reviewDes;
	}

	public void setReviewDes(String reviewDes) {
		this.reviewDes = reviewDes;
	}

	public int getReviewStar() {
		return reviewStar;
	}

	public void setReviewStar(int reviewStar) {
		this.reviewStar = reviewStar;
	}

	public int getStNum() {
		return stNum;
	}

	public void setStNum(int stNum) {
		this.stNum = stNum;
	}

	public String getMemId() {
		return memId;
	}

	public void setMemId(String memId) {
		this.memId = memId;
	}

	public int getReviewState() {
		return reviewState;
	}

	public void setReviewState(int reviewState) {
		this.reviewState = reviewState;
	}

	public java.util.Date getReviewDate() {
		return reviewDate;
	}

	public void setReviewDate(java.util.Date reviewDate) {
		this.reviewDate = reviewDate;
	}

}
