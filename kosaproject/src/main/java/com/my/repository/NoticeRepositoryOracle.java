package com.my.repository;

import java.util.ArrayList;
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
import com.my.vo.Notice;

@Repository("noticeRepository")
public class NoticeRepositoryOracle implements NoticeRepository {
	
	@Autowired
	SqlSessionFactory sqlSessionFactory;
	
	@Override
	public void insert(Notice noti) throws AddException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			session.insert("com.my.mybatis.NoticeMapper.insert",noti);
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
	public List<Notice> selectAll() throws FindException {
		return null;
	}
	
	
	@Override
	public int selectCount() throws FindException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			return session.selectOne("com.my.mybatis.NoticeMapper.selectCount");
		} catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		}finally {
			if(session !=null) {
				session.close();
			}
		}
	}
	
	public List<Notice> selectAll(int currentPage, int cntPerPage) throws FindException{
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			int startRow = ((currentPage-1)*cntPerPage)+1;
			int endRow = currentPage*cntPerPage;
			Map<String, Object> map = new HashMap<>();
			map.put("startRow",startRow);
			map.put("endRow", endRow);
			return session.selectList("com.my.mybatis.NoticeMapper.selectAll",map);
		} catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		}finally {
			if(session !=null) {
				session.close();
			}
		}
	}
	
	@Override
	public List<Notice> searchNoti(int currentPage, int cntPerPage,String search) throws FindException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			int startRow = ((currentPage-1)*cntPerPage)+1;
			int endRow = currentPage*cntPerPage;
			Map<String, Object> map = new HashMap<>();
			search = '%'+search+'%';
			map.put("search", search);
			map.put("startRow",startRow);
			map.put("endRow", endRow);
			return session.selectList("com.my.mybatis.NoticeMapper.searchNoti",map);
		} catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		}finally {
			if(session !=null) {
				session.close();
			}
		}
	}
	
	@Override
	public int selectSearchCount(String search) throws FindException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			search = '%'+search+'%';
			return session.selectOne("com.my.mybatis.NoticeMapper.selectSearchCount",search);
		} catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		}finally {
			if(session !=null) {
				session.close();
			}
		}
	}

	public Notice selectByNo(int no) throws FindException{
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			return session.selectOne("com.my.mybatis.NoticeMapper.selectByNo", no);
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
	public int findNext(int no) throws FindException {
		SqlSession session = null;
		List<Integer> list = new ArrayList<>();
		int i = 0;
		try {
			session = sqlSessionFactory.openSession();
			list = session.selectList("com.my.mybatis.NoticeMapper.findAll");
			for(int n : list) {
				if(n == no) {
					break;
				}else {
					i++;
				}
			}
			return list.get(i+1);
		} catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		}finally {
			if(session !=null) {
				session.close();
			}
		}
	}

	@Override
	public int findPre(int no) throws FindException {
		SqlSession session = null;
		List<Integer> list = new ArrayList<>();
		int i = 0;
		try {
			session = sqlSessionFactory.openSession();
			list = session.selectList("com.my.mybatis.NoticeMapper.findAll");
			for(int n : list) {
				if(n== no) {
					break;
				}else {
					i++;
				}
			}
			return list.get(i-1);
		} catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		}finally {
			if(session !=null) {
				session.close();
			}
		}
	}

	@Override
	public void delete(int no) throws RemoveException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			session.delete("com.my.mybatis.NoticeMapper.delete",no);
		}catch (Exception e) {
			throw new RemoveException(e.getMessage());
		}finally {
			if(session !=null) {
				session.close();
			}
		}
	}

	@Override
	public void update(Notice noti) throws ModifyException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			session.update("com.my.mybatis.NoticeMapper.update",noti);
		} catch(Exception e) {
			throw new ModifyException(e.getMessage());
		}finally {
			if(session !=null) {
				session.close();
			}
		}
	}
	
	

}