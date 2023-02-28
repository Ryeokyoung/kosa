package com.my.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.dto.PageBean;
import com.my.exception.AddException;
import com.my.exception.FindException;
import com.my.exception.ModifyException;
import com.my.exception.RemoveException;
import com.my.repository.MemberRepository;
import com.my.vo.Member;
import com.my.vo.Notice;

@Service
public class MemberService {
	@Autowired
	private MemberRepository repository;
	
	public MemberRepository getRepository() {
		return repository;
	}
	public void setRepository(MemberRepository repository) {
		this.repository = repository;
	}
	
	public MemberService() {}
	
	public MemberService(MemberRepository repository) {
		this.repository = repository;
	}
	
	public void idDupChk(String id) throws FindException{
		repository.selectById(id);
	}
	public void signUp(Member m) throws AddException{
		repository.insert(m);
	}
	public Member searchById(String id) throws FindException{
		return repository.selectById(id);
	}

	public void memMody(Member m) throws ModifyException{
		repository.modify(m);
	}
	public void deleteMem(String id) throws RemoveException{
		repository.delete(id);
	}

	public PageBean<Member> getPageBean(int currentPage) throws FindException {
		List<Member> list = findAll(currentPage,PageBean.CNT_PER_PAGE);
		int totalCnt = repository.selectCount();
		PageBean<Member> pb = new PageBean<>(currentPage, list, totalCnt);
		return pb;
	}
	
	public List<Member> findAll(int currentPage, int cntPerPage) throws FindException{
		return repository.selectAll(currentPage, cntPerPage);
	}
	public Member findByName(Member m) throws FindException{
		return repository.findId(m);
	}
	public Member findById(Member m) throws FindException{
		return repository.findPwd(m);

	}
	public Member searchByNo(String memNo) throws FindException{
		return repository.selectByNo(memNo);
	}
	public PageBean<Member> getPageBeanBySelect(int currentPage, int memPower, int memState) throws FindException {
		List<Member> list = selectByPowerState(currentPage,PageBean.CNT_PER_PAGE,memPower,memState);
		int totalCnt = repository.selectCountByPowerState(memPower,memState);
		PageBean<Member> pb = new PageBean<>(currentPage, list, totalCnt);
		return pb;
	}
	private List<Member> selectByPowerState(int currentPage,int cntPerPage ,int memPower, int memState) throws FindException {
		return repository.selectByPowerState(currentPage,cntPerPage, memPower,memState);
	}
}
