package com.MateuszLebioda.OneCinema.controller;

import com.MateuszLebioda.OneCinema.service.FilmService;
import com.MateuszLebioda.OneCinema.service.Formatter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.wordnik.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/films")
@RestController
public class FilmController {

    @Autowired
    FilmService filmService;

    @Autowired
    Formatter formatter;

    @ApiOperation(value = "Return description of film")
    @RequestMapping(value = "/description/{id}", method = RequestMethod.GET)
    @ResponseBody
    public String spot(@PathVariable String id) throws JsonProcessingException {
        return  formatter.returnJson(filmService.getFilmDescriptionById(id));
    }

    @ApiOperation(value = "Return simple set of film")
    @RequestMapping(value = "/simpleMovieList", method = RequestMethod.GET)
    @ResponseBody
    public String getSimpleFilms() throws JsonProcessingException {
        return  formatter.returnJson(filmService.getAllSimpleMovieApiModel());
    }
}
