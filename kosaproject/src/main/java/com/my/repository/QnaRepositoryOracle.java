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
import com.my.vo.Qna;

@Repository("qnaRepository")
public class QnaRepositoryOracle implements QnaRepository{
	
		@Autowired
		SqlSessionFactory sqlSessionFactory;
		
		@Override
		public void insert(Qna qna) throws AddException { 
			SqlSession session = null;
			try {
				session = sqlSessionFactory.openSession();
				session.insert("com.my.mybatis.QnaMapper.insert",qna);
			} catch (Exception e) {
				e.printStackTrace();
				throw new AddException(e.getMessage());
			}finally { 
				if(session !=null) {
					session.close();
				}
			}
			
		
		}

		@Override
		public List<Qna> selectAll() throws FindException {
			// TODO Auto-generated method stub
			return null;
		}
		
		public List<Qna> selectAll(int currentPage, int cntPerPage) throws FindException{
			SqlSession session = null;
			try {
				session = sqlSessionFactory.openSession();
				int startRow = ((currentPage-1)*cntPerPage)+1;
				int endRow = currentPage*cntPerPage;
				Map<String, Object> map = new HashMap<>();
				map.put("startRow",startRow);
				map.put("endRow", endRow);
				return session.selectList("com.my.mybatis.QnaMapper.selectAll",map);
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
		public int selectCount() throws FindException {
			SqlSession session = null;
			try {
				session = sqlSessionFactory.openSession();
				return session.selectOne("com.my.mybatis.QnaMapper.selectCount");
			} catch (Exception e) {
				e.printStackTrace();
				throw new FindException(e.getMessage());
			}finally {
				if(session !=null) {
					session.close();
				}
			}
		}

		public Qna selectByNo(int no) throws FindException{
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			return session.selectOne("com.my.mybatis.QnaMapper.selectByNo", no);
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
		public void update(Qna qna) throws ModifyException {
			SqlSession session = null;
			try {
				session = sqlSessionFactory.openSession();
				session.update("com.my.mybatis.QnaMapper.update",qna);
			} catch(Exception e){
				e.printStackTrace();
				throw new ModifyException(e.getMessage());
			} finally {
				if(session != null) {
					session.close();
				}
			}
		}
		
		@Override
	      public List<Qna> selectById(String qnaId) throws FindException {
	         SqlSession session = null;
	         try {
	         session = sqlSessionFactory.openSession();
	         return session.selectList("com.my.mybatis.QnaMapper.selectById",qnaId);
	         }catch(Exception e) {
	            e.printStackTrace();
	            throw new FindException(e.getMessage());
	         }finally {
	            if(session != null);{
	               session.close();
	            }
	         }
	      }
		





}