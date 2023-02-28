package control;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.my.dto.PageBean;
import com.my.exception.FindException;
import com.my.exception.ModifyException;
import com.my.service.QnaService;
import com.my.vo.Qna;

@RestController
@RequestMapping("qna/*")
public class QnaController {
	
	@Autowired
	private QnaService service;
	
	@PostMapping("new")
	public Map<String,Object> addqna(@RequestBody Qna qna) {
		Map<String,Object> map = new HashMap<>();
		try {
			service.addQna(qna);
			map.put("msg","회원님의 이야기가 팀에게 전달되었습니다!");
		} catch (Exception e) {
			e.printStackTrace();
			map.put("msg","실패!");
		}
		return map;
	}
	
	@GetMapping("{qnaNo}")
	public Map<String,Object> qnaContent(@PathVariable int qnaNo) throws FindException{
		Map<String,Object> map = new HashMap<>();
		Qna qna = service.selectNo(qnaNo);
		map.put("Qna", qna);
		map.put("status", 1);
		return map;
	}
	
	@GetMapping("list/{currentPage}") //jsonObj.pb.list
	public Map<String,Object> qnaList(@PathVariable int currentPage){
		Map<String,Object> map = new HashMap<>();
		PageBean<Qna> pb = null;
		try {
			pb = service.getPageBean(currentPage);
			map.put("status", 1);
			map.put("pb", pb);
		} catch (FindException e) {
			e.printStackTrace();
			map.put("status", 0);
		}
		return map;//jsonobj
	}
	@GetMapping("mylist/{qnaId}")
	   public Map<String, Object> mylist(@PathVariable String qnaId){
	      Map<String, Object> map = new HashMap<>();
	      List<Qna> list = new ArrayList<>();
	      
	      try {
	         list = service.selectById(qnaId);
	         map.put("list", list); 
	         map.put("status", 1);
	      } catch (FindException e) {
	         e.printStackTrace();
	         map.put("status", 0);
	      }
	      return map;
	   }
	@PutMapping("modify")
	public Map<String, Object> modify(@RequestBody Qna qna){
		Map<String, Object> map = new HashMap<>();
		try {
			service.update(qna);
			map.put("status", 1);
		} catch (ModifyException e) {
			e.printStackTrace();
			map.put("status",0);
		}
		return map;
	}
	//수정 
//	@PutMapping("{qnaNo}")
//	public  Map<String,Object> qnaUpdate(@PathVariable int qnaNo, @RequestBody Qna qna){
//		Map<String,Object> map = new HashMap<>();
//		try {
//			qna.setQnaNo(qnaNo);
//			service.updateQna(qna);
//			map.put("status", 1);
//			map.put("msg", "변경 성공!");
//		} catch (ModifyException e) {
//			e.printStackTrace();
//			map.put("status", 0);
//			map.put("msg", "변경 실패!"+e.getMessage());
//		}
//		return map;
//	}
}
