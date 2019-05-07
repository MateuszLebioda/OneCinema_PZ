package com.MateuszLebioda.OneCinema.controller;

import com.MateuszLebioda.OneCinema.service.Formatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping
@RestController
public class FilmDescriptionController {



    @Autowired
    Formatter formatter;

    /*@RequestMapping(value = "/films/{id}", method = RequestMethod.GET)
    @ResponseBody
    public String spot(@PathVariable String id) throws JsonProcessingException {
        /*return  formatter.returnJson(filmService.getDescriptionFilmById(id));
    }*/
}
