package control;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.my.dto.PageBean;
import com.my.exception.AddException;
import com.my.exception.FindException;
import com.my.exception.ModifyException;
import com.my.exception.RemoveException;
import com.my.service.ReviewService;
import com.my.service.StoreService;
import com.my.vo.Notice;
import com.my.vo.Review;

@RestController
@RequestMapping("review/*")
public class ReviewController {
	@Autowired
	private ReviewService service;
	
	@Autowired
	private StoreService sService;
	
	static String location = "review/";
	
	@PostMapping(value="write", produces = "application/json;charset=utf-8" )
	public ResponseEntity<?> write1(HttpSession session,
			@RequestPart   MultipartFile chooseFile,
			Review rv){
		String id = (String)session.getAttribute("id");
		Map<String, Object> map = new HashMap<>();
		try {
			rv.setMemId(id);
			int reviewNo = service.insert(rv);
			sService.star(rv.getReviewStar(),rv.getStNum());
			File fDir = new File("C:/finalPro/");
			if(!fDir.exists()) { //업로드 경로가 없는 경우
				fDir.mkdir();
			}
			String originName = chooseFile.getOriginalFilename();
			long fileLength = chooseFile.getSize();
			System.out.println("파일이름:" + originName + ", 파일크기:" + fileLength);

			if(fileLength == 0 || "".equals(originName)) {
				throw new AddException("첨부파일이 비었거나 파일이름이 없습니다");
			}

			String saveFileName =rv.getStNum() + "_" + id+reviewNo + "_" + originName; 

			File saveFile = new File("C:/finalPro/review/", saveFileName);
			try {
				//원본의 내용을 복사본에 붙여넣기
				FileCopyUtils.copy(chooseFile.getBytes(), saveFile);
			} catch (Exception e) {
				e.printStackTrace();
				throw new AddException(e.getMessage());
			} 
			//--------------------
			map.put("status", 1);
			return new ResponseEntity<>(map,HttpStatus.OK);
		}catch(AddException e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(),
					                    HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (ModifyException e1) {
			e1.printStackTrace();
			return new ResponseEntity<>(e1.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
		}	
	}
	
	@PostMapping("list/{stNum}/{currentPage}")
	public Map<String, Object> list(@PathVariable int currentPage,  @PathVariable int stNum){
		Map<String, Object>map = new HashMap<>();
		PageBean<Review> pb = null; 
		try {
			pb = service.getPageBean(currentPage, stNum);
			map.put("pb", pb);
			map.put("status", 1);
			
		} catch (FindException e) {
			e.printStackTrace();
			map.put("status", 0);
		}
		return map;
	}
	
	
	
//	@GetMapping("reviewdetail")
//	public ResponseEntity<?> detail(int reviewNo) throws FindException{
//		Review rv = service.findByreviewNo(reviewNo);
//		//글번호별 첨부파일이름들 응답 
//		List<String>fileNames = new ArrayList<>();
//		String saveDirectory = "c:\\files";
//		File dir = new File(saveDirectory); 
//		String[] allFileNames = dir.list();
//		for(String fn: allFileNames) {
//			if(fn.startsWith(reviewNo + "_")) {
//				fileNames.add(fn);
//			}
//		}
//		Map<String, Object> map = new HashMap<>();
//		map.put("rv", rv);
//		map.put("fileNames", fileNames);			
//		return new ResponseEntity<>(map, HttpStatus.OK);		
//	}

	@PostMapping(value="modify/{reviewNo}")
	public Map<String, Object> modify(HttpSession session,@PathVariable int reviewNo, Review rv, @RequestPart MultipartFile img){
		Map<String, Object> map = new HashMap<>();
		try {
			rv.setReviewNo(reviewNo);
			service.reviewMemory(rv);
			map.put("status", 1);
			map.put("msg", "수정 성공!");

			boolean flag = false;
			String imgOriginName = img.getOriginalFilename();
			long imgSize = img.getSize();

			if(imgSize > 0 && !"".equals(imgOriginName)) {
				flag = true;
			}
			if(flag) {
				String saveDirectory = "C:\\Users\\skdud\\OneDrive\\바탕 화면\\review";
				File dir = new File(saveDirectory);
				if(!dir.exists()) {
					dir.mkdir();
				}

				String saveFileName = rv.getMemId()+"_"+ rv.getStNum()+"_" + imgOriginName;

				File[] files = dir.listFiles();
				for(File f1: files) {
					String[] fName = f1.getName().split("_");
					if(fName[0].equals(rv.getMemId()) && fName[1].equals(""+rv.getStNum())) {
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



	@DeleteMapping("delete/{reviewNo}")
	public ResponseEntity<?> delete(@PathVariable int reviewNo) throws  RemoveException  {
		//		reviewNo = 6;
		service.delete(reviewNo);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
