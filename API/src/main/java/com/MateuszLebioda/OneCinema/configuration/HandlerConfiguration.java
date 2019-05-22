package com.MateuszLebioda.OneCinema.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerAdapter;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

@Configuration
public class HandlerConfiguration {
    @Bean
    public HandlerMapping handler(){
        return new RequestMappingHandlerMapping();
    }

    @Bean
    public HandlerAdapter adapter(){
        return new RequestMappingHandlerAdapter();
    }
}
