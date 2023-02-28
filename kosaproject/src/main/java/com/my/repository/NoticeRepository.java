package com.my.repository;

import java.sql.BatchUpdateException;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.my.exception.AddException;
import com.my.exception.FindException;
import com.my.exception.ModifyException;
import com.my.exception.RemoveException;
import com.my.vo.Notice;

//@Repository
public interface NoticeRepository {
	/**
	 * 공지사항 추가
	 * @author 김혁준
	 * @param notice
	 * @throws AddException
	 */
	void insert(Notice notice) throws AddException;
	/**
	 * 공지사항 전체
	 * @author 김혁준
	 * @return 공지사항 전체
	 * @throws FindException
	 */
	List<Notice> selectAll() throws FindException;
	/**
	 * 공지사항 전체 개수
	 * @author 김혁준
	 * @return
	 * @throws FindException
	 */
	int selectCount() throws FindException;
	
	/**
	 * 검색한 공지사항 총 개수
	 * @param search
	 * @return
	 * @throws FindException
	 */
	int selectSearchCount(String search) throws FindException;
	
	
	/**
	 * 공지사항 페이징
	 * @author 김혁준
	 * @param currentPage
	 * @param cntPerPage
	 * @return
	 * @throws FindException
	 */
	List<Notice> selectAll(int currentPage, int cntPerPage) throws FindException;
	
	/**
	 * 공지사항 검색
	 * @param search
	 * @return
	 * @throws FindException
	 */
	List<Notice> searchNoti(int currentPage, int cntPerPage,String search) throws FindException;
	
	/**
	 * 번호에 해당하는 공지사항 반환
	 * @author 김혁준
	 * @param no
	 * @return
	 * @throws FindException
	 */
	Notice selectByNo(int no) throws FindException;
	
	/**
	 * 다음 공지사항 확인
	 * @author 김혁준
	 * @param no
	 * @return
	 * @throws FindException
	 */
	int findNext(int no) throws FindException;
	
	/**
	 * 이전 공지사항 확인
	 * @author 김혁준
	 * @param no
	 * @return
	 * @throws FindException
	 */
	int findPre(int no) throws FindException;
	
	/**
	 * 공지사항 삭제
	 * @author 김혁준
	 * @param no
	 * @throws RemoveException
	 */
	void delete(int no) throws RemoveException;
	
	/**
	 * 공지사항 수정 (미완)
	 * @author 김혁준
	 * @param noti
	 * @throws ModifyException
	 */
	void update(Notice noti) throws ModifyException;
}
