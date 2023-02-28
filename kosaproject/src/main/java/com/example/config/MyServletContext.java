package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
@ComponentScan(basePackages = {"control"})
@EnableWebMvc
public class MyServletContext implements WebMvcConfigurer {
	
	@Bean
	public CommonsMultipartResolver multipartResolver() {
		CommonsMultipartResolver r = new CommonsMultipartResolver();
		r.setMaxUploadSize(1024*1024*10);
		r.setMaxUploadSizePerFile(1024*1024*10);
		r.setDefaultEncoding("UTF-8");
		return r;
	}
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		WebMvcConfigurer.super.addCorsMappings(registry);
		registry.addMapping("/**").allowCredentials(true).allowedOrigins("http://192.168.2.22:9999").allowedMethods("GET","POST","PUT","DELETE"); //메서드 체이닝
		registry.addMapping("/**").allowCredentials(true).allowedOrigins("http://192.168.2.22:5500").allowedMethods("GET","POST","PUT","DELETE");
	}

//	@Bean
//	public ViewResolver viewResolver() {
//		InternalResourceViewResolver resolver = new InternalResourceViewResolver();
//		resolver.setPrefix("/WEB-INF/view/");
//		resolver.setSuffix(".jsp");
//		return resolver;
//	}

//	@Override
//	public void addResourceHandlers(ResourceHandlerRegistry registry) {
//		registry.addResourceHandler("/html/**").addResourceLocations("classpath:/static/html/");
//		registry.addResourceHandler("/js/**").addResourceLocations("classpath:/static/js/");
//	}
}