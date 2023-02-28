package com.my.util;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.my.exception.AddException;

public class Attach {
	public static final String SAVE_DIRECTORY = "C:/finalPro/";

	public static ResponseEntity<?> download(String fileName, String location) throws IOException{		
		File file = new File(SAVE_DIRECTORY+location, fileName);	
		if(!file.exists()) {
			throw new IOException("파일이 없습니다");
		}
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.set(HttpHeaders.CONTENT_LENGTH, file.length() + ""); // 응답길이

		String contentType = Files.probeContentType(file.toPath());
//		System.out.println("Files.probeContentType(file.toPath())=" + contentType);
		responseHeaders.set(HttpHeaders.CONTENT_TYPE, Files.probeContentType(file.toPath()));
		if (contentType.startsWith("image/")) { // 이미지파일인경우 바로 응답
			responseHeaders.set(HttpHeaders.CONTENT_DISPOSITION,
					"inline; filename=" + URLEncoder.encode(fileName, "UTF-8"));
		} else { // 이미지파일이 아닌경우 다운로드
			responseHeaders.set(HttpHeaders.CONTENT_DISPOSITION,
					"attechment; filename=" + URLEncoder.encode(fileName, "UTF-8"));
		}
		return new ResponseEntity<>(FileCopyUtils.copyToByteArray(file), responseHeaders, HttpStatus.OK);
	}

	public static boolean remove(String fileName, String location) {
		File dir = new File(SAVE_DIRECTORY+location, fileName);
		return dir.delete();
	}

	public static void upload(int no, MultipartFile f,String location, String Name) throws AddException {
		File fDir = new File(SAVE_DIRECTORY+location);
		if(!fDir.exists()) { //업로드 경로가 없는 경우
			fDir.mkdir();
		}
		String originName = f.getOriginalFilename();
		long fileLength = f.getSize();
		System.out.println("파일이름:" + originName + ", 파일크기:" + fileLength);

		if (fileLength == 0 || "".equals(originName)) {
			throw new AddException("첨부파일이 비었거나 파일이름이 없습니다");
		}

		String saveFileName =no + "_" + Name + "_" + originName; 

		File saveFile = new File(SAVE_DIRECTORY+location, saveFileName);
		try {
			// 원본의 내용을 복사본에 붙여넣기
			FileCopyUtils.copy(f.getBytes(), saveFile);
		} catch (Exception e) {
			e.printStackTrace();
			throw new AddException(e.getMessage());
		}
	}
	public static void upload(int no, List<MultipartFile> list,String location, String stName) throws AddException {
		for(MultipartFile f: list) {
			upload(no, f,location, stName);

		}
	}
}
