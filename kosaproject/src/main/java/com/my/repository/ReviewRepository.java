package com.my.repository;

import java.util.List;

import com.my.exception.AddException;
import com.my.exception.FindException;
import com.my.exception.ModifyException;
import com.my.exception.RemoveException;
import com.my.vo.Member;
import com.my.vo.Review;

public interface ReviewRepository {
	/**
	 * 글을 추가한다
	 * 추가된 글번호 조회하여 반환한다
	 * @author 장나영
	 * @param rv 리뷰
	 * @throws AddException
	 */
	int insert(Review rv) throws AddException;
	
		
	
	/**
	 * 리뷰내용수정
	 * @author 장나영
	 * @param rv
	 * @throws ModifyException
	 */
	void update(Review rv) throws ModifyException;


	/**
	 * 리뷰 상태 0으로 바꾸어 안보이게 함
	 * @author 장나영
	 * @param memId
	 * @throws RemoveException , FindException
	 */
	void delete(String memId) throws RemoveException;

	void updateReviewState(int reviewNo, int stNum) throws RemoveException;
 
	
	/**
	 * 고객 Id별 리뷰목록 불러오기 
	 * @author 장나영
	 * @param id
	 * @throws FindException
	 */
	void selectById(String id) throws FindException;
	
	/**
	 * 가게번호별 리뷰를 최신순으로 보여준다
	 * @author 장나영
	 * @param stNum
	 * @throws FindException
	 */
	List<Review> selectBystNum(int currentPage, int cntPerPage, int stNum) throws FindException;
	
	/**
	 * 가게번호별 리뷰를 별점순으로 보여준다 
	 * @author 장나영
	 * @param stNum
	 * @throws FindException
	 */
	List<Review> selectBystNumStar(int stNum) throws FindException;

	/**
	 * 회원 자신이 리뷰를 수정한다. 
	 * @author 장나영
	 * @param rv
	 */
	void modify(Review rv) throws ModifyException;

	/**
	 * 회원 자신이 리뷰를 삭제한다. 
	 * @author 장나영
	 * @param reviewNo
	 * @throws RemoveException
	 */
	void delete(int reviewNo) throws RemoveException;

	void delMem(String id) throws ModifyException;
	
	int selectCount(int stNum) throws FindException;


	
	
}
