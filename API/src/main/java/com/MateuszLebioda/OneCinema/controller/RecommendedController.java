package com.MateuszLebioda.OneCinema.controller;

import com.MateuszLebioda.OneCinema.service.FilmService;
import com.MateuszLebioda.OneCinema.utils.Formatter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.wordnik.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recommended")
public class RecommendedController {

    @Autowired
    Formatter formatter;

    @Autowired
    FilmService filmService;

    @ApiOperation(value = "List of latest MovieShortInfoApiModel")
    @RequestMapping(value = "/get8latest", method = RequestMethod.GET)
    @ResponseBody
    public String getSimpleFilms() throws JsonProcessingException {
        return  formatter.returnJson(filmService.get8LatestFilms());
    }
}
