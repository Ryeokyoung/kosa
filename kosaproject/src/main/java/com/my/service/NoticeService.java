package com.my.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.dto.PageBean;
import com.my.exception.AddException;
import com.my.exception.FindException;
import com.my.exception.ModifyException;
import com.my.exception.RemoveException;
import com.my.repository.NoticeRepository;
import com.my.vo.Notice;

@Service("noticeService")
public class NoticeService {
	@Autowired
	private NoticeRepository repository;
	
	public NoticeService() {}
	
	public NoticeService(NoticeRepository repository) {
		this.repository = repository;
	}
	
	public List<Notice> findAll(int currentPage, int cntPerPage) throws FindException{
		return repository.selectAll(currentPage, cntPerPage);
	}
	
	public List<Notice> find(int currentPage, int cntPerPage, String search) throws FindException{
		return repository.searchNoti(currentPage, cntPerPage, search);
	}
	
	public void addNoti(Notice notice) throws AddException{
		repository.insert(notice);
		System.out.println("add성공");
	}
	
	public PageBean<Notice> getPageBean(int currentPage) throws FindException{
		List<Notice> list = findAll(currentPage,PageBean.CNT_PER_PAGE);
		int totalCnt = repository.selectCount();
		PageBean<Notice> pb = new PageBean<>(currentPage, list, totalCnt);
		return pb;
	}
	
	public PageBean<Notice> getPageBeanSearch(int currentPage, String search) throws FindException{
		List<Notice> list = find(currentPage,PageBean.CNT_PER_PAGE, search);
		int totalCnt = repository.selectSearchCount(search);
		PageBean<Notice> pb = new PageBean<>(currentPage, list, totalCnt);
		return pb;
	}
	
	public Notice selectNo(int no) throws FindException{
		return repository.selectByNo(no);
	}
	public int selectPre(int no) throws FindException{
		return repository.findPre(no);
	}
	public int selectNext(int no) throws FindException{
		return repository.findNext(no);
	}
	public void deleteNotice(int no) throws RemoveException{
		repository.delete(no);
	}
	public void updateNotice(Notice noti) throws ModifyException{
		repository.update(noti);
	}
}
