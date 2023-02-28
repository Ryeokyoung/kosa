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
import com.my.vo.Menu;
import com.my.vo.Store;

@Repository("storeRepository")
public class StoreRepositoryOracle implements StoreRepository {

	@Autowired
	SqlSessionFactory sqlSessionFactory;

	@Override
	public int insert(Store store) throws AddException {
		SqlSession session = null;
		int stNum;
		try {
			session = sqlSessionFactory.openSession();
			session.insert("com.my.mybatis.StoreMapper.insert", store);
			System.out.println(store.getStNum());
			session.close();

			List<Menu> foodList = store.getStMenuList();
			for (Menu menu : foodList) {
				session = sqlSessionFactory.openSession();
				menu.setStNum(store.getStNum());
				session.insert("com.my.mybatis.StoreMapper.insertfood", menu);
			}
			return store.getStNum();

		} catch (Exception e) {
			e.printStackTrace();
			throw new AddException(e.getMessage());
		} finally {
			if (session != null) {
				session.close();
			}
		}

	}

	@Override
	public int selectCount(int status) throws FindException {
		SqlSession session = sqlSessionFactory.openSession();
		try {
			return session.selectOne("com.my.mybatis.StoreMapper.selectCount", status);
		} finally {
			if (session != null) {

				session.close();
			}
		}
	}

	

	@Override
	public List<Store> submitted(int status, int currentPage, int cntPerPage) throws FindException {
		List<Store> list = new ArrayList<>();
		Map<String, Object> map = new HashMap<>();
		SqlSession session = null;
		try {
			System.out.println(status);
			int startRow = ((currentPage - 1) * cntPerPage) + 1;
			int endRow = currentPage * cntPerPage;
			map.put("startRow", startRow);
			map.put("endRow", endRow);
			map.put("status", status);
			session = sqlSessionFactory.openSession();
			return session.selectList("com.my.mybatis.StoreMapper.submitted", map);
		} catch (Exception e) {
			throw new FindException(e.getMessage());
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}

	@Override
	public Store selectByNo(int stNum) throws FindException {
		SqlSession session = null;
		Store s = new Store();
		try {
			session = sqlSessionFactory.openSession();
			return session.selectOne("com.my.mybatis.StoreMapper.selectByNo", stNum);
		} catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}

	@Override
	public List<Menu> findMenu(int stNum) throws FindException {
		SqlSession session = null;
		List<Menu> list = new ArrayList<>();
		try {
			session = sqlSessionFactory.openSession();
			return session.selectList("com.my.mybatis.StoreMapper.selectMenu", stNum);
		} catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}

	@Override
	public void confirmStore(int stNum) throws ModifyException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			session.update("com.my.mybatis.StoreMapper.confirmStore", stNum);
		} catch (Exception e) {
			e.printStackTrace();
			throw new ModifyException(e.getMessage());
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}

	@Override
	public List<Store> selectById(String memId) throws FindException {
		SqlSession session = null;
		
		try {
		session = sqlSessionFactory.openSession();
		return session.selectList("com.my.mybatis.StoreMapper.selectById",memId);
		}catch (Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
		} finally {
			if (session != null) {
				session.close();
			}
		}
		
	}


		
	public List<Store> selectByCatePageBean(int cateNum, int currentPage, int cntPerPage) throws FindException{
		SqlSession session = null;
		List<Store> list = new ArrayList<>();
		try {
			session = sqlSessionFactory.openSession();
			int startRow = ((currentPage-1)*cntPerPage)+1;
//			int startRow = 1;
			int endRow = currentPage*cntPerPage;
			System.out.println("-----------------------------------------------");
			System.out.println("cp : " + currentPage + cntPerPage);
			System.out.println("startrow : "+startRow);
			System.out.println("endRow : "+endRow);
			System.out.println("-----------------------------------------------");
			Map<String, Object> map = new HashMap<>();
			map.put("startRow",startRow);
			map.put("endRow", endRow);
			map.put("cateNum", cateNum);
			list =  session.selectList("com.my.mybatis.StoreMapper.selectByCatePageBean",map);
			System.out.println(list);
			return list;
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
	public int selectCountByCate(int cateNum) throws FindException {
		SqlSession session = sqlSessionFactory.openSession();
		try {
			return session.selectOne("com.my.mybatis.StoreMapper.selectCountByCate", cateNum);
		} finally {
			if (session != null) {

				session.close();
			}
		}
	}

	@Override
	public void star(int star, int stNum) throws ModifyException {
		SqlSession session = null;
		Map<String, Object> map = new HashMap<>();
		try {
			session=sqlSessionFactory.openSession();
			map.put("star", star);
			map.put("stNum", stNum);
			session.update("com.my.mybatis.StoreMapper.star",map);
		}catch(Exception e) {
			e.printStackTrace();
			throw new ModifyException();
		}finally {
			if(session!=null) {
				session.close();
			}
		}
		
	}

	@Override
	public int selectStoreCount() throws FindException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			return session.selectOne("com.my.mybatis.StoreMapper.selectStoreCount");
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
	public List<Store> selectSearch(int currentPage, int cntPerPage, String search) throws FindException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			int startRow = ((currentPage-1)*cntPerPage)+1;
			int endRow = currentPage*cntPerPage;
			Map<String, Object> map = new HashMap<>();
			map.put("startRow",startRow);
			map.put("endRow", endRow);
			map.put("search", search);
			return session.selectList("com.my.mybatis.StoreMapper.selectAll",map);
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
	public List<Store> selectByStoreNum(int stNum) throws FindException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			return session.selectList("com.my.mybatis.StoreMapper.selectStoreLoad", stNum);
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
	public void viewCnt(int stNum) throws ModifyException {
		SqlSession session = null;
		session = sqlSessionFactory.openSession();
		session.update("com.my.mybatis.StoreMapper.viewCnt",stNum);
		if(session!=null) {
			session.close();
		}
	}

	@Override
	public void modify(Store store) throws ModifyException {
		SqlSession session = null;
		session = sqlSessionFactory.openSession();
		session.update("com.my.mybatis.StoreMapper.update",store);
		if(session!=null) {
			session.close();
		}
		List<Menu> foodList = store.getStMenuList();
		for (Menu menu : foodList) {
			session = sqlSessionFactory.openSession();
			menu.setStNum(store.getStNum());
			session.insert("com.my.mybatis.StoreMapper.updatefood", menu);
		}
	}

	@Override
	public List<Store> mostView() throws FindException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			return session.selectList("com.my.mybatis.StoreMapper.mostView");
		} finally {
			if(session !=null) {
				session.close();
			}
		}
	}

	@Override
	public List<Store> currStore() throws FindException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			return session.selectList("com.my.mybatis.StoreMapper.currStore");
		} finally {
			if(session !=null) {
				session.close();
			}
		}
	}
	
	@Override
	public void delete(int stNum)  {
		SqlSession session = null;
		
		try {
			session = sqlSessionFactory.openSession();
			session.update("com.my.mybatis.StoreMapper.delete", stNum);			
			session.close();


		} catch (Exception e) {
			e.printStackTrace();
			
		} finally {
			if (session != null) {
				session.close();
			}
		}
		
	}
	
	
	
	
}



	
	
	
	
	
	
	
	
	
	
	
	


