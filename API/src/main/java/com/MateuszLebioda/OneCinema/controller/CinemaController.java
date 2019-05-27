package com.MateuszLebioda.OneCinema.controller;

import com.MateuszLebioda.OneCinema.service.CinemaService;
import com.MateuszLebioda.OneCinema.utils.formatters.Formatter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.wordnik.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/cinema")
@RestController
public class CinemaController {

    @Autowired
    CinemaService cinemaService;

    @Autowired
    Formatter formatter;

    @ApiOperation(value = "Return description of main cinema")
    @RequestMapping(value = "/getMainCinema", method = RequestMethod.GET)
    @ResponseBody
    public String mainCinema() throws JsonProcessingException {
        return  formatter.returnJson(cinemaService.getMainCinema());
    }
}
