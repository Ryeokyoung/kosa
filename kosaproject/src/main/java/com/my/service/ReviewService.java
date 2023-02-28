package com.my.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.dto.PageBean;
import com.my.exception.AddException;
import com.my.exception.FindException;
import com.my.exception.ModifyException;
import com.my.exception.RemoveException;
import com.my.repository.ReviewRepository;
import com.my.vo.Notice;
import com.my.vo.Review;


@Service("ReviewService")
public class ReviewService {
   @Autowired
      private ReviewRepository repository;
      
      public ReviewService() {}
      
      public ReviewService(ReviewRepository repository) {
         this.repository = repository;
      }
      
      public int insert(Review rv) throws AddException {
         return repository.insert(rv);
      }
      
      public void modify(Review rv) throws ModifyException {
         repository.update(rv);
      }
      
      public void delete(String memId) throws RemoveException {
         repository.delete(memId);
      }
      
      public void delMem(String id) throws ModifyException{
    	  repository.delMem(id);
      }

      public void updateReviewState(int reviewNo, int stNum) throws RemoveException {
    	  repository.updateReviewState(reviewNo, stNum);
      }

      public void selectById(String memId) throws FindException{
    	  repository.selectById(memId);
      }

      public void update(Review rv) throws ModifyException {
    	  repository.update(rv);
      }


      public ReviewRepository getRepository() {
    	  return repository;
      }

      public void setRepository(ReviewRepository repository) {
    	  this.repository = repository;
      }

      public List<Review> selectBystNumStar(int stNum) throws FindException{
    	  return repository.selectBystNumStar(stNum);
      }

//      public List<Review> selectBystNumNew(int stNum) throws FindException{
//    	  return repository.selectBystNumNew(stNum);
//      }

      public List<Review> selectBystNum(int currentPage, int cntPerPage, int stNum) throws FindException {
    	  return repository.selectBystNum(currentPage, cntPerPage, stNum);
      }

      public PageBean<Review> getPageBean(int currentPage, int stNum) throws FindException{
    	List<Review> list = selectBystNum(currentPage,PageBean.CNT_PER_PAGE, stNum);
    	System.out.println(list);
  		int totalCnt = repository.selectCount(stNum);
  		PageBean<Review> pb = new PageBean<>(currentPage, list, totalCnt);
  		return pb;
      }

      public void delete(int reviewNo) throws RemoveException{
    	  repository.delete(reviewNo);
      }

      public void reviewMemory(Review rv) throws ModifyException{
    	  repository.modify(rv);
      }
	
}
