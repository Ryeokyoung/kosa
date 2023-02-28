package com.my.repository;

import java.util.List;

import com.my.exception.AddException;
import com.my.exception.FindException;
import com.my.exception.ModifyException;
import com.my.vo.Qna;

public interface QnaRepository {
	
	/****
	 * QNA 추가 
	 * @author 김려경
	 * @param Qna
	 * @throws AddException
	 */
	void insert(Qna qna) throws AddException;
	
	/****
	 * QNA 전체 개수
	 * @author 김려경
	 * @return
	 * @throws FindException
	 */
	List<Qna> selectAll() throws FindException;
	
	
	/***
	 * 
	 * @param currentPage
	 * @param cntPerPage
	 * @return
	 * @throws FindException
	 */
	List<Qna> selectAll(int currentPage, int cntPerPage) throws FindException;

	/****
	 * qna 전체 개수 
	 * @return
	 * @throws FindException
	 */
	int selectCount() throws FindException;

	/****
	 * 
	 * @param no
	 * @return
	 * @throws FindException
	 */
	
	Qna selectByNo(int no) throws FindException;
	
	/***
	 * 수정페이지 
	 * @author 김려경
	 * @param qna 
	 * @throws ModifyException
	 */
	void update (Qna qna) throws ModifyException;
	
	List<Qna> selectById(String qnaId) throws FindException;
}
