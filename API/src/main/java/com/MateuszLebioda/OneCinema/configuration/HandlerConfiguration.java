//package com.MateuszLebioda.OneCinema.configuration;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.converter.StringHttpMessageConverter;
//import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
//import org.springframework.web.servlet.HandlerAdapter;
//import org.springframework.web.servlet.HandlerMapping;
//import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
//import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
//
//import javax.persistence.Basic;
//
//@Configuration
//public class HandlerConfiguration {
//    @Bean
//    public HandlerMapping handler(){
//        return new RequestMappingHandlerMapping();
//    }
//
//    @Bean
//    public HandlerAdapter adapter(){
//        return new RequestMappingHandlerAdapter();
//    }
//
//    @Bean
//    public StringHttpMessageConverter xx(){
//        return new StringHttpMessageConverter();
//    }
//
//    @Bean
//    public MappingJackson2HttpMessageConverter zaza(){
//        return new MappingJackson2HttpMessageConverter();
//    }
//}
