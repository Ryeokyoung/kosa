package com.my.repository;

import java.util.List;

import com.my.exception.AddException;
import com.my.exception.FindException;

import com.my.exception.ModifyException;
import com.my.vo.Member;
import com.my.vo.Menu;

import com.my.vo.Store;

public interface StoreRepository {
	
	/**
	 * 가게등록 
	 * @author 이남규
	 * @param store  
	 * @return 
	 * @throws AddException
	 */
	int insert(Store store) throws AddException;
	
	/**
	 * @author 김혁준
	 * @return 신청한 후 승인되지 않은 가게 전체 리스트
	 * @throws FindException
	 */


	/**
	 * @author 이남규
	 * @return
	 * @throws FindException
	 */
	int selectStoreCount() throws FindException;
	
	/**
	 * @author 이남규
	 * @param currentPage
	 * @param cntPerPage
	 * @param search
	 * @return
	 * @throws FindException
	 */
	List<Store> selectSearch(int currentPage, int cntPerPage, String search) throws FindException;
	

	List<Store> submitted(int status,int currentPage, int cntPerPage) throws FindException;
	

	
	/**
	 * @author 김혁준
	 * @return 신청된 가게 개수
	 * @throws FindException
	 */
	public int selectCount(int status) throws FindException;
	
	
	/**
	 * @author 김혁준 
	 * @param storeNo
	 * @return 번호에 해당하는 가게 객체
	 * @throws FindException
	 */
	public Store selectByNo(int stNum) throws FindException;
	
	/**
	 * @author 김혁준
	 * @param stNum
	 * @return 가게에 해당하는 메뉴 전체
	 * @throws FindException
	 */
	public List<Menu> findMenu(int stNum) throws FindException;
	
	/**
	 * 등록 신청된 가게를 승인한다. ST_STATUS를 1로 변경한다.
	 * @author 김혁준
	 * @param stNum
	 * @throws ModifyException
	 * 
	 */
	public void confirmStore(int stNum) throws ModifyException;

	List<Store> selectById(String id) throws FindException;


	List<Store> selectByCatePageBean(int cateNum, int currentPage, int cntPerPage) throws FindException;



	public int selectCountByCate(int cateNum) throws FindException;

	void star(int star, int stNum) throws ModifyException;

	List<Store> selectByStoreNum(int stNum) throws FindException;
	
	public void viewCnt(int stNum) throws ModifyException;
	
	public void modify(Store store) throws ModifyException;
	
	public List<Store> mostView() throws FindException;
	
	public List<Store> currStore() throws FindException;
	
	void delete(int stNum) throws ModifyException;
}
