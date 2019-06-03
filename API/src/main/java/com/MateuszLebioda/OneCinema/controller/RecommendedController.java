package com.MateuszLebioda.OneCinema.controller;

import com.MateuszLebioda.OneCinema.service.FilmService;
import com.MateuszLebioda.OneCinema.utils.formatters.Formatter;
import com.fasterxml.jackson.core.JsonProcessingException;
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

    //@ApiOperation(value = "List of latest MovieShortInfoApiModel")
    @RequestMapping(value = "/get8latest", method = RequestMethod.GET)
    @ResponseBody
    public String getSimpleFilms() throws JsonProcessingException {
        return  formatter.returnJson(filmService.get8LatestFilms());
    }

    //@ApiOperation(value = "List of 4 random MovieShortInfoApiModel")
    @RequestMapping(value = "/get4Random", method = RequestMethod.GET)
    @ResponseBody
    public String getRandom() throws JsonProcessingException {
        return  formatter.returnJson(filmService.get4RandomActualFilm());
    }



}
