package control;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.my.dto.PageBean;
import com.my.exception.AddException;
import com.my.exception.FindException;
import com.my.exception.ModifyException;
import com.my.exception.RemoveException;
import com.my.service.MemberService;
import com.my.service.ReviewService;
import com.my.vo.Member;
import com.my.vo.Review;

//@Controller
@RestController
@RequestMapping("member/*")
public class MemberRestController {
	@Autowired
	MemberService service;
	
	@Autowired
	ReviewService rService;
	
	@PostMapping(value="iddupchk")
	public Map<String, Object> iddupchk(String id) {
		Map<String, Object> map = new HashMap<>();
		try {
			service.idDupChk(id);
			map.put("status", 0);
			map.put("msg", "아이디 사용불가");
		} catch (FindException e) {
			e.printStackTrace();
			map.put("status", 1);
			map.put("msg", "아이디 사용가능");
		}
		return map;
	}
	
	@PostMapping(value="new")
	public Map<String, Object> signup(Member m, @RequestPart MultipartFile img){
		Map<String, Object> map = new HashMap<>();
		try {
			service.signUp(m);
			map.put("status", 1);
			map.put("msg", "회원가입 성공!");
			String saveDirectory = "C:/finalPro/profile";

			File fDir = new File(saveDirectory);
			if(!fDir.exists()) {
				fDir.mkdir();
			}
			long imgSize = img.getSize();
			String imgOriginName = img.getOriginalFilename();
			String saveFileName = m.getMemId()+"_"+imgOriginName;
			if(imgSize ==0 || "".equals(imgOriginName)) {
				System.out.println("이미지파일이 첨부되지 않았습니다.");
			}else {
				File saveImg = new File(saveDirectory, saveFileName);
				FileCopyUtils.copy(img.getBytes(), saveImg);
			}
		} catch (AddException e) {
			e.printStackTrace();
			map.put("status", 0);
			map.put("msg", e.getMessage());
		} catch (IOException e) {
			e.printStackTrace();
			map.put("status", 0);
			map.put("msg", e.getMessage());
		}
		return map;
	}
	
	@PostMapping(value="{memId}")
	public Map<String,Object> login(HttpSession session,@RequestBody Member m ){
		Map<String, Object> map = new HashMap<>();
		try {
			Member m2 = service.searchById(m.getMemId());
			if(m2.getMemPwd().equals(m.getMemPwd())) {
				if(m2.getMemState() == 0) {
					throw new RemoveException();
				}
				session.setAttribute("id", m2.getMemId());
				session.setAttribute("power", m2.getMemPower());
				session.setAttribute("nick", m2.getMemNick());
				map.put("status", 1);
				map.put("msg", "로그인 성공");
			}else {
				throw new FindException();
			}
		} catch (FindException e) {
			e.printStackTrace();
			map.put("status", 0);
			map.put("msg", "회원 정보가 일치하지 않습니다.");
		} catch (RemoveException e) {
			map.put("status", 0);
			map.put("msg", "탈퇴한 계정입니다.");
		}
		return map;
	}
	
	
	@GetMapping(value="logout")	
	public void logout(HttpSession session){
		session.invalidate();
	}
	
	@GetMapping("mypage/{memId}")
	public Map<String, Object> mypage(HttpSession session, @PathVariable String memId){
		Map<String, Object> map = new HashMap<>();
		HttpHeaders responseHeaders = new HttpHeaders();
		try {
			Member m = service.searchById(memId);
			map.put("status",1);
			map.put("member", m);
		} catch (FindException e) {
			e.printStackTrace();
			map.put("status", 0);
		}
		return map;
	}
	
	@PostMapping(value="modify")
	public Map<String, Object> modify(HttpSession session, Member m, @RequestPart MultipartFile img){
		Map<String, Object> map = new HashMap<>();
		try {
			service.memMody(m);
			map.put("status", 1);
			map.put("msg", "수정 성공!");
			
			boolean flag = false;
			String imgOriginName = img.getOriginalFilename();
			long imgSize = img.getSize();
			
			if(imgSize > 0 && !"".equals(imgOriginName)) {
				flag = true;
			}
			if(flag) {
				String saveDirectory = "C:/finalPro/profile";

				File dir = new File(saveDirectory);
				if(!dir.exists()) {
					dir.mkdir();
				}
				
				String saveFileName = m.getMemId()+"_"+imgOriginName;
				
				File[] files = dir.listFiles();
				for(File f1: files) {
					String[] fName = f1.getName().split("_");
					if(fName[0].equals(m.getMemId())) {
						f1.delete();
					}
				}
				
				File saveImg = new File(saveDirectory, saveFileName);
				FileCopyUtils.copy(img.getBytes(), saveImg);
			}
		} catch (ModifyException e) {
			e.printStackTrace();
			map.put("status", 0);
			map.put("msg", e.getMessage());
		} catch (IOException e) {
			e.printStackTrace();
			map.put("status", 0);
			map.put("msg", e.getMessage());
		}
		return map;
	}
	
	@PutMapping(value="{memId}")
	public Map<String, Object> delmem(HttpSession session, @PathVariable String memId){
		Map<String, Object> map = new HashMap<>();
		List<Review> list = new ArrayList<>();
		try {
			service.deleteMem(memId);
			session.invalidate();
			rService.delMem(memId);
			map.put("status", 1);
		} catch (RemoveException e) {
			e.printStackTrace();
			map.put("status", 0);
		} catch (ModifyException e) {
			e.printStackTrace();
			map.put("status", 0);
		}
		return map;
	}
		
	@GetMapping(value="session")
	public Map<String, Object> session(HttpSession session){
		Map<String, Object> map = new HashMap<>();
		String id = (String)session.getAttribute("id");
		if(id == null) {
			map.put("status", 0);
			return map;
		}else {
			int power = (Integer)session.getAttribute("power");
			String nick = (String)session.getAttribute("nick");
			map.put("status", 1);
			map.put("id", id);
			map.put("power", power);
			map.put("nick", nick);
			return map;
		}
	}
	@PostMapping("findid")
	public Map<String, Object> findId(@RequestBody Member m){
		Map<String, Object> map = new HashMap<>();
		try {
			Member fm = service.findByName(m);
			map.put("status", 1);
			map.put("memId", fm.getMemId());
			return map;
		} catch (Exception e) {
			e.printStackTrace();
			map.put("status", 0);
			return map;
		}
	}
	@PostMapping("findpwd")
	public Map<String, Object> findPwd(@RequestBody Member m){
		Map<String, Object> map = new HashMap<>();
		try {
			Member fm = service.findById(m);
			map.put("status", 1);
			map.put("memPwd", fm.getMemPwd());
			return map;
		} catch (Exception e) {
			e.printStackTrace();
			map.put("status", 0);
			return map;
		}
	}
	
	@GetMapping("list/{currentPage}")
	public Map<String, Object> list(@PathVariable int currentPage){
		Map<String, Object> map = new HashMap<>();
		PageBean<Member> pb = null;
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
	
	@PutMapping(value="drop/{memId}")
	   public Map<String, Object> dropMem(HttpSession session, @PathVariable String memId){
	      Map<String, Object> map = new HashMap<>();
	      List<Review> list = new ArrayList<>();
	      try {
	         service.deleteMem(memId);
	         rService.delMem(memId);
	         map.put("status", 1);
	      } catch (RemoveException e) {
	         e.printStackTrace();
	         map.put("status", 0);
	      } catch (ModifyException e) {
	         e.printStackTrace();
	         map.put("status", 0);
	      }
	      return map;
	   }
	
	@GetMapping("memberpage/{memId}")
	public Map<String, Object> memberpage(@PathVariable String memId){
		Map<String, Object> map = new HashMap<>();
		try {
		Member m  =service.searchById(memId);
		map.put("status",1);
		map.put("member", m);
		
	} catch (FindException e) {
		e.printStackTrace();
		map.put("status", 0);
	}
	return map;
	}
	
	@GetMapping("selectlist/{currentPage}/{memPower}/{memState}")
	public Map<String, Object> selectlist(@PathVariable int currentPage, @PathVariable int memPower, @PathVariable int memState){
		Map<String, Object> map = new HashMap<>();
		PageBean<Member> pb = null;
		try {
			pb = service.getPageBeanBySelect(currentPage,memPower,memState);
			map.put("status", 1);
			map.put("pb", pb);
		} catch (FindException e) {
			e.printStackTrace();
			map.put("status", 0);
		}
		return map;
	}
	
}
