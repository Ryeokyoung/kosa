package com.my.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.dto.PageBean;
import com.my.exception.AddException;
import com.my.exception.FindException;
import com.my.exception.ModifyException;
import com.my.repository.QnaRepository;
import com.my.vo.Qna;

@Service("qnaService")
public class QnaService {

	@Autowired //주입하려고 하는 객체의 타입이 일하는지 여부를 확인 후 자동주입 
	private QnaRepository repository; 
	
	public QnaService() {
		
	}
	
	public QnaService(QnaRepository repository) {
		this.repository = repository;
	}
	//등록 
	public void addQna(Qna qna)throws AddException{
		repository.insert(qna);
		System.out.println("add성공");
	}

	//목록 
	public List<Qna> findAll(int currentPage, int cntPerPage) throws FindException{
		return repository.selectAll(currentPage, cntPerPage);
	}

	public PageBean<Qna> getPageBean(int currentPage) throws FindException{
		List<Qna> list = findAll(currentPage,PageBean.CNT_PER_PAGE);
		int totalCnt = repository.selectCount();
		PageBean<Qna> pb = new PageBean<>(currentPage, list, totalCnt);
		return pb;
	}

	public Qna selectNo(int no) throws FindException{
		return repository.selectByNo(no);
	}
	
	//수정 
	public void update(Qna qna) throws ModifyException {
		repository.update(qna);
	}
	public List<Qna> selectById(String qnaId) throws FindException{
	      return repository.selectById(qnaId);
	   }

	
	
	
	
	
}
