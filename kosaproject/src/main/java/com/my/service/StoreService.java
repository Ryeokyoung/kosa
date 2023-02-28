package com.my.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.dto.PageBean;
import com.my.exception.AddException;
import com.my.exception.FindException;
import com.my.exception.ModifyException;
import com.my.exception.RemoveException;
import com.my.repository.StoreRepository;
import com.my.vo.Menu;
import com.my.vo.Store;

@Service("storeService")
public class StoreService {
	@Autowired
	private StoreRepository repository;
	
	public StoreService() {}
	
	public StoreService(StoreRepository repository) {
		this.repository = repository;
	}
	
	/**
	 * 페이지에 해당하는 페이지빈정보를 반환한다
	 * @param currentPage
	 * @return 페이지빈 페이지빈에는 게시글목록, 총페이지수, 페이지그룹의 시작페이지, 끝페이지정보가 모두 담겨있다
	 * @throws FindException
	 */
	public int addStore(Store store) throws AddException{
		int stNum = repository.insert(store);
		System.out.println("add성공");
		return stNum;
	}

	
	public List<Store> submittedStore(int status,int currentPage, int cntPerPage) throws FindException{
		return repository.submitted(status,currentPage, cntPerPage);
	}
	public PageBean<Store> getPageBean(int status, int currentPage) throws FindException{
		List<Store> list = submittedStore(status,currentPage,PageBean.CNT_PER_PAGE);
		int totalCnt = repository.selectCount(status);
		PageBean<Store> pb = new PageBean<>(currentPage, list, totalCnt);
		return pb;
	}
	
	
	public Store selectByNo(int stNum) throws FindException{
		return repository.selectByNo(stNum);
	}
	public List<Menu> findMenu(int stNum) throws FindException{
		return repository.findMenu(stNum);
	}
	public void confirm(int stNum) throws ModifyException{
		repository.confirmStore(stNum);

	}
	
	public List<Store> selectById(String memId) throws FindException{
		return repository.selectById(memId);
	}
	
	
	public PageBean<Store> getPageBeanByCate(int currentPage, int cateNum) throws FindException{
		List<Store> list = selectByCatePageBean(cateNum,currentPage, PageBean.CNT_PER_PAGE);
		int totalCnt = repository.selectCountByCate(cateNum);
		PageBean<Store> pb = new PageBean<>(currentPage, list, totalCnt);
		return pb;
	}

	private List<Store> selectByCatePageBean(int cateNum, int currentPage, int cntPerPage) throws FindException {
		return repository.selectByCatePageBean(cateNum, currentPage, cntPerPage);
	}
	

	public void star(int star, int stNum) throws ModifyException{
		repository.star(star, stNum);
	}
	
	public List<Store> findAll(int currentPage, int cntPerPage, String search) throws FindException{
		return repository.selectSearch(currentPage, cntPerPage, search);
	}
	public PageBean<Store> stListGetPageBean(int currentPage, String search) throws FindException{
		List<Store> list = findAll(currentPage,PageBean.CNT_PER_PAGE, search);
		int totalCnt = repository.selectStoreCount();
		PageBean<Store> pb = new PageBean<>(currentPage, list, totalCnt);
		return pb;
	}
	
	public List<Store> selectStoreNo(int stNum) throws FindException{
		return repository.selectByStoreNum(stNum);
	}
	
	public void viewCntUp(int stNum) throws ModifyException{
		repository.viewCnt(stNum);
	}
	
	public void modifyStore(Store store) throws ModifyException{
		repository.modify(store);
	}
	
	public List<Store> mostViewStore() throws FindException{
		return repository.mostView();
	}
	
	public List<Store> currentStore() throws FindException{
		return repository.currStore();
	}
	public void deleteStore(int stNum) throws ModifyException, RemoveException{
		repository.delete(stNum);
	}
	
}
