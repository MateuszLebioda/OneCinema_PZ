package com.MateuszLebioda.OneCinema.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;

@Service
public class FormatterImp implements Formatter {

    public  <T> String returnJson(T obj) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        String format = DateFormat.FORMAT;
        objectMapper.setDateFormat(new SimpleDateFormat(format));
        return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(obj);
    }
}
