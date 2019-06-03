package com.MateuszLebioda.OneCinema.controller;

import com.MateuszLebioda.OneCinema.exception.CannotFindObjectException;
import com.MateuszLebioda.OneCinema.exception.WrongTimeException;
import com.MateuszLebioda.OneCinema.service.RoomService;
import com.MateuszLebioda.OneCinema.service.SeanceService;
import com.MateuszLebioda.OneCinema.utils.formatters.Formatter;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/seance")
public class SeanceController {

    @Autowired
    Formatter formatter;

    @Autowired
    RoomService roomService;

    @Autowired
    SeanceService seanceService;

    //@ApiOperation("Get information about seance and room")
    @RequestMapping(value = "/getBySeanceId/{id}",method = RequestMethod.GET)
    @ResponseBody
    public String getSeanceAndRoomApiModel(@PathVariable String id) throws CannotFindObjectException, JsonProcessingException {
        return  formatter.returnJson(roomService.getSeanceAndRoomBySeanceId(id));
    }

    //@ApiOperation("Get movie list")
    @RequestMapping(value = "/getMovieList/{dayNumber}",method = RequestMethod.GET)
    @ResponseBody
    public String getMoviesList(@PathVariable int dayNumber) throws CannotFindObjectException, JsonProcessingException, WrongTimeException {
        return  formatter.returnJson(seanceService.getMovieProjectionApiModelList(dayNumber));
    }



}
