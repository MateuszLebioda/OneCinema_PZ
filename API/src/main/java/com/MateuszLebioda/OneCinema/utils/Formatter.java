package com.MateuszLebioda.OneCinema.utils;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface Formatter {
    <T> String returnJson(T obj) throws JsonProcessingException;
}
