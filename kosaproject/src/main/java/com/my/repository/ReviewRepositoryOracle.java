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
import com.my.vo.Member;
import com.my.vo.Review;


@Repository("ReviewRepository")
public class ReviewRepositoryOracle implements ReviewRepository{

	@Autowired
	private SqlSessionFactory sqlSessionFactory;

	@Override
	public int insert(Review rv) throws AddException {
		SqlSession session = null;
		try {
			System.out.println(rv.getReviewStar());
			session = sqlSessionFactory.openSession();
			session.insert("com.my.mybatis.ReviewMapper.insert",rv);
			return rv.getReviewNo();
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
	public void selectById(String memId) throws FindException {
		Member m= new Member();
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			m = session.selectOne("com.my.mybatis.ReviewMapper.selectById", memId);
			if(m == null) {
				throw new Exception();
			}
			return;
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
	public void delMem(String id) throws ModifyException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			session.update("com.my.mybatis.ReviewMapper.delMem",id);
			System.out.println("여기는 안될걸");
		} catch(Exception e) {
			e.printStackTrace();
			throw new ModifyException(e.getMessage());
		} finally {
			if(session!=null) {
				session.close();
			}
		}
	}



	@Override
	public List<Review> selectBystNum(int currentPage, int cntPerPage, int stNum) throws FindException {
		List<Review> list = new ArrayList<>();
		SqlSession session = null;
		Map<String, Object>map = new HashMap<>();
		try {
			session = sqlSessionFactory.openSession();
			int startRow = ((currentPage-1)*cntPerPage)+1;
			int endRow = currentPage*cntPerPage;
			map.put("startRow", startRow);
			map.put("endRow", endRow);
			map.put("stNum", stNum);
			list = session.selectList("com.my.mybatis.ReviewMapper.selectBystNum", map);
			return list;
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
	public int selectCount(int stNum) throws FindException {
		SqlSession session = null;
		int cnt = 0;
		try {
			session = sqlSessionFactory.openSession();
			cnt = session.selectOne("com.my.mybatis.ReviewMapper.selectCount", stNum);
			return cnt;
		} catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		} finally {
			if(session != null) {
				session.close();
			}
		}
	}

	
	public List<Review> selectBystNumNew(int stNum) throws FindException {
		List<Review> list = new ArrayList<>();
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			list = session.selectList("com.my.mybatis.ReviewMapper.selectBystNumNew", stNum);
			return list;
		}catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		}finally {
			if(session != null) {
				session.close();
			}
		}

	}



	@Override
	public List<Review> selectBystNumStar(int stNum) throws FindException {
		List<Review> list = new ArrayList<>();
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			list = session.selectList("com.my.mybatis.ReviewMapper.selectBystNumNew", stNum);
			return list;
		}catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		}finally {
			if(session != null) {
				session.close();
			}
		}

	}




	@Override
	public void update(Review rv) throws ModifyException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			int rowcnt = session.update("com.my.mybatis.ReviewMapper.update",rv);
			if(rowcnt == 0) {
				throw new ModifyException("글번호가 없거나 작성자가 다른경우 수정할 수 없습니다");
			}
		}catch(Exception e) {
			e.printStackTrace();
			throw new ModifyException(e.getMessage());
		}finally {
			if(session != null) {
				session.close();
			}
		}
	}

	@Override
	public void updateReviewState(int reviewNo, int stNum) throws RemoveException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			//Map<String, Integer> map = new HashMap<>();
			//map.put("reviewNo", reviewNo);
			//map.put("stNum", stNum);
			Review rv = new Review();
			rv.setReviewNo(reviewNo);
			rv.setStNum(stNum);
			session.update("com.my.mybatis.ReviewMapper.updateReviewState",rv);

		}catch(Exception e) {
			e.printStackTrace();
			throw new RemoveException(e.getMessage());
		}finally {
			if(session != null) {
				session.close();
			}
		}

	}



	@Override
	public void modify(Review rv) throws ModifyException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			session.update("com.my.mybatis.ReviewMapper.modify",rv);
		} catch (Exception e) {
			e.printStackTrace();
			throw new ModifyException(e.getMessage());
		}finally {
			if(session != null) {
				session.close();
			}
		}

	}



	@Override
	public void delete(int reviewNo) throws RemoveException {
		SqlSession session = null;

		try {
			session = sqlSessionFactory.openSession();

			session.update("com.my.mybatis.ReviewMapper.delete",reviewNo);

		}catch(Exception e) {
			e.printStackTrace();
			throw new RemoveException(e.getMessage());
		}finally {
			if(session != null) {
				session.close();
			}
		}

	}


	@Override
	public void delete(String memId) throws RemoveException {
		
	}

}
	
	


	
	

	

