package com.my.vo;

public class Menu {
	private int stNum;
	private String menuName;
	private int menuPrice;
	
	public int getStNum() {
		return stNum;
	}
	public void setStNum(int stNum) {
		this.stNum = stNum;
	}
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	public int getMenuPrice() {
		return menuPrice;
	}
	public void setMenuPrice(int menuPrice) {
		this.menuPrice = menuPrice;
	}
	public Menu() {
		super();
	}
	public Menu(int stNum, String menuName, int menuPrice) {
		super();
		this.stNum = stNum;
		this.menuName = menuName;
		this.menuPrice = menuPrice;
	}
	
	
}
