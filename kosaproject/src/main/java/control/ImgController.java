package control;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Files;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.my.exception.FindException;

@RestController
public class ImgController {
	
	public static final String SAVE_DIRECTORY = "C:/finalPro/";
	
	@GetMapping("download/{dir}/{name}")
	public ResponseEntity<?> download(@PathVariable String dir, @PathVariable String name){
		
		try {
			String fileName = null;
			File directory = new File(SAVE_DIRECTORY+dir);
			String[] allFileNames = directory.list();
			for(String fn: allFileNames) {
				if(fn.startsWith(name+"_")){
					fileName = fn;
				}
			}
			System.out.println(fileName);
			System.out.println(dir);
			File file = new File(SAVE_DIRECTORY+dir, fileName);
			HttpHeaders responseHeaders = new HttpHeaders();
			responseHeaders.set(HttpHeaders.CONTENT_LENGTH, file.length() + ""); // 응답길이	
			String contentType = Files.probeContentType(file.toPath());
			responseHeaders.set(HttpHeaders.CONTENT_TYPE, Files.probeContentType(file.toPath()));
			responseHeaders.set(HttpHeaders.CONTENT_DISPOSITION,
					"inline");
			return new ResponseEntity<>(FileCopyUtils.copyToByteArray(file), responseHeaders, HttpStatus.OK);
		} catch(IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
