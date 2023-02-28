package com.my.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.my.exception.AddException;
import com.my.exception.FindException;
import com.my.exception.ModifyException;
import com.my.exception.RemoveException;
import com.my.vo.Member;

@Repository("memberRepository")
public class MemberRepositoryOracle implements MemberRepository{
	
	@Autowired
	SqlSessionFactory sqlSessionFactory;
	
	public SqlSessionFactory getSqlSessionFactory() {
		return sqlSessionFactory;
	}

	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
		this.sqlSessionFactory = sqlSessionFactory;
	}

	@Override
	public void insert(Member m) throws AddException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			session.insert("com.my.mybatis.MemberMapper.insert", m);
		} catch (Exception e) {
			e.printStackTrace();
			throw new AddException(e.getMessage());
		}finally {
			if(session != null) {
				session.close();
			}
		}
	}

	@Override
	public Member selectById(String id) throws FindException {
		Member M= new Member();
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			M = session.selectOne("com.my.mybatis.MemberMapper.selectById", id);
			if(M == null) {
				throw new FindException();
			}
			return M;
		} catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		}finally {
			if(session != null) {
				session.close();
			}
		}
	}

	@Override
	public void modify(Member m) throws ModifyException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			session.update("com.my.mybatis.MemberMapper.modify",m);
		} catch (Exception e) {
			e.printStackTrace();
			throw new ModifyException(e.getMessage());
		}finally {
			if(session != null) {
				session.close();
			}
		}
	}

	public void delete(String id) throws RemoveException{
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			session.update("com.my.mybatis.MemberMapper.delete",id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RemoveException(e.getMessage());
		}finally {
			if(session != null) {
				session.close();
			}
		}
	}


	@Override
	public int selectCount() throws FindException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			return session.selectOne("com.my.mybatis.MemberMapper.selectCount");
		} catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		}finally {
			if(session != null) {

				session.close();
			}
		}
	}
	public Member findId(Member m) throws FindException{
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			Member findM = session.selectOne("com.my.mybatis.MemberMapper.findId",m);
			return findM;
		} catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		} finally {
			if(session != null) {
				session.close();
			}
		}
	}


	@Override
	public List<Member> selectAll() throws FindException {
		return null;
	}

	@Override
	public List<Member> selectAll(int currentPage, int cntPerPage) throws FindException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			int startRow = ((currentPage-1)*cntPerPage)+1;
			int endRow = currentPage*cntPerPage;
			Map<String, Object> map = new HashMap<>();
			map.put("startRow",startRow);
			map.put("endRow", endRow);
			return session.selectList("com.my.mybatis.MemberMapper.selectAll",map);
		} catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		}finally {
			if(session != null) {

				session.close();
			}
		}
	}

	public Member findPwd(Member m) throws FindException{
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			Member findM = session.selectOne("com.my.mybatis.MemberMapper.findPwd",m);
			return findM;
		} catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		} finally {
			if(session != null) {

				session.close();
			}
		}
	}

	
	
	@Override
	public Member selectByNo(String memNo) throws FindException {
		Member M= new Member();
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			M = session.selectOne("com.my.mybatis.MemberMapper.selectByNo", memNo);
			if(M == null) {
				throw new Exception();
			}
			return M;
		} catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		}finally {
			if(session != null) {
				session.close();
			}
		}
	}

	@Override
	public List<Member> selectByPowerState(int currentPage, int cntPerPage, int memPower, int memState) throws FindException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			int startRow = ((currentPage-1)*cntPerPage)+1;
			int endRow = currentPage*cntPerPage;
			Map<String, Object> map = new HashMap<>();
			map.put("startRow",startRow);
			map.put("endRow", endRow);
			map.put("memPower", memPower);
			map.put("memState", memState);
			return session.selectList("com.my.mybatis.MemberMapper.selectByPowerState",map);
		} catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		}finally {
			if(session != null) {

				session.close();
			}
		}
	}

	@Override
	public int selectCountByPowerState(int memPower, int memState) {
		Map<String, Object> map = new HashMap<>();
		map.put("memPower", memPower);
		map.put("memState",memState);
		SqlSession session = sqlSessionFactory.openSession();
		try {
			return session.selectOne("com.my.mybatis.MemberMapper.selectCountByPowerState",map);
		} finally {
			if (session != null) {

				session.close();
			}
		}
	}
	

}
