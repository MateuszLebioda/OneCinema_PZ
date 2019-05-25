package com.MateuszLebioda.OneCinema.controller;

import com.MateuszLebioda.OneCinema.service.RoomService;
import com.MateuszLebioda.OneCinema.utils.Formatter;
import com.MateuszLebioda.OneCinema.utils.mappers.RoomMaper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.wordnik.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/room")
@RestController
public class RoomController {

    @Autowired
    RoomService roomService;

    @Autowired
    Formatter formatter;


    @ApiOperation(value = "Return simple set of film")
    @RequestMapping(value = "/getRooms", method = RequestMethod.GET)
    @ResponseBody
    public String getSimpleFilms() throws JsonProcessingException {
        return  formatter.returnJson(roomService.getAllRooms());
    }

}
