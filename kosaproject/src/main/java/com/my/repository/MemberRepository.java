package com.my.repository;

import java.util.List;

import com.my.exception.AddException;
import com.my.exception.FindException;
import com.my.exception.ModifyException;
import com.my.exception.RemoveException;
import com.my.vo.Member;


public interface MemberRepository {
	
	/**
	 * 회원 가입
	 * @author 김혁준
	 * @param m
	 * @throws AddException
	 */
	void insert(Member m)throws AddException;	
	
	/**
	 * 아이디에 맞는 정보 반환
	 * @author 김혁준
	 * @param id
	 * @return
	 * @throws FindException
	 */
	Member selectById(String id) throws FindException;
	
	/**
	 * 정보 수정
	 * @author 김혁준
	 * @param m
	 * @throws ModifyException
	 */
	void modify(Member m)throws ModifyException;
	
	/**
	 * 회원 탈퇴( 데이터를 삭제하지 않고 state를 0으로 바꾼다.)
	 * @author 김혁준
	 * @param id
	 * @throws RemoveException
	 */
	void delete(String id) throws RemoveException;


	int selectCount() throws FindException;
	
	List<Member> selectAll() throws FindException;
	
	List<Member> selectAll(int currentPage, int cntPerPage) throws FindException;
	

	
	/**
	 * 아이디 찾기 (이름이랑 전화번호만 사용)
	 * @author 김혁준
	 * @param m
	 * @return
	 * @throws FindException
	 */
	Member findId(Member m) throws FindException;
	
	/**
	 * 비밀번호 찾기 (아이디와 전화번호만 사용)
	 * @author 김혁준
	 * @param m
	 * @return
	 * @throws FindException
	 */
	Member findPwd(Member m) throws FindException;

	Member selectByNo(String memNo) throws FindException;
	
	List<Member> selectByPowerState(int currentPage, int cntPerPage, int memPower, int memState) throws FindException;

	int selectCountByPowerState(int memPower, int memState);

}
