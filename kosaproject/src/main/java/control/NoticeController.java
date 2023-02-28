package control;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.my.dto.PageBean;
import com.my.exception.AddException;
import com.my.exception.FindException;
import com.my.exception.ModifyException;
import com.my.exception.RemoveException;
import com.my.service.NoticeService;
import com.my.vo.Notice;

@RestController
@RequestMapping("notice/*")
public class NoticeController {
	@Autowired
	private NoticeService service;

	@PostMapping("new")
	public Map<String,Object> addnoti(@RequestBody Notice noti) {
		Map<String,Object> map = new HashMap<>();
		try {
			service.addNoti(noti);
			map.put("msg", "성공!");
		} catch (AddException e) {
			e.printStackTrace();
			map.put("msg", "실패!");
		}
		return map;	
	}
	
	@GetMapping("list/{currentPage}")
	public Map<String,Object> noticeList(@PathVariable int currentPage){
		Map<String,Object> map = new HashMap<>();
		PageBean<Notice> pb = null;
		try {
			pb = service.getPageBean(currentPage);
			map.put("status", 1);
			map.put("pb", pb);
		} catch (FindException e) {
			e.printStackTrace();
			map.put("status", 0);
		}
		return map;
	}
	
	@GetMapping("{notiNo}")
	public Map<String,Object> noticeContent(@PathVariable int notiNo){
		Map<String,Object> map = new HashMap<>();
		try {
			Notice noti = service.selectNo(notiNo);
			map.put("noti", noti);
			map.put("status", 1);
		} catch (FindException e) {
			e.printStackTrace();
			map.put("status", 0);
			map.put("msg", e.getMessage());
		}
		return map;
	}
	
	@GetMapping("next/{notiNo}")
	public Map<String,Object> noticenext(@PathVariable int notiNo){
		Map<String,Object> map = new HashMap<>();
		try {
			int nextNo = service.selectNext(notiNo);
			map.put("nextNo", nextNo);
			map.put("status", 1);
		} catch (FindException e) {
			e.printStackTrace();
			map.put("status", 0);
			map.put("msg", "다음글이 없습니다.");
		}
		return map;
	}
	
	@GetMapping("pre/{notiNo}")
	public Map<String,Object> noticepre(@PathVariable int notiNo){
		Map<String,Object> map = new HashMap<>();
		try {
			int preNo = service.selectPre(notiNo);
			map.put("preNo", preNo);
			map.put("status", 1);
		} catch (FindException e) {
			e.printStackTrace();
			map.put("status", 0);
			map.put("msg", "이전글이 없습니다.");
		}
		return map;
	}
	
	@DeleteMapping("{notiNo}")
	public  Map<String,Object> noticeDelete(@PathVariable int notiNo){
		Map<String,Object> map = new HashMap<>();
		try {
			service.deleteNotice(notiNo);
			map.put("status", 1);
			map.put("msg", "삭제 성공!");
		} catch (RemoveException e) {
			e.printStackTrace();
			map.put("status", 1);
			map.put("msg", "삭제 실패!"+e.getMessage());
		}
		return map;
	}
	
	@PutMapping("{notiNo}")
	public  Map<String,Object> noticeUpdate(@PathVariable int notiNo, @RequestBody Notice noti){
		Map<String,Object> map = new HashMap<>();
		try {
			noti.setNotiNo(notiNo);
			service.updateNotice(noti);
			map.put("status", 1);
			map.put("msg", "변경 성공!");
		} catch (ModifyException e) {
			e.printStackTrace();
			map.put("status", 0);
			map.put("msg", "변경 실패!"+e.getMessage());
		}
		return map;
	}
	
	@GetMapping("search/{search}/{currentPage}")
	public Map<String,Object> searchNoti(@PathVariable String search, @PathVariable int currentPage){
		Map<String,Object> map = new HashMap<>();
		PageBean<Notice> pb = null;
		try {
			pb = service.getPageBeanSearch(currentPage, search);
			map.put("status", 1);
			map.put("pb", pb);
		} catch (FindException e) {
			e.printStackTrace();
			map.put("status", 0);
		}
		return map;
	}
	
	
	
	
	
	
	
	
	
	
}
