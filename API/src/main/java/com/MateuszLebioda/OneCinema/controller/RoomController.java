package com.MateuszLebioda.OneCinema.controller;

import com.MateuszLebioda.OneCinema.Model.Sence.SeanceRequestModel;
import com.MateuszLebioda.OneCinema.exception.CannotFindObjectException;
import com.MateuszLebioda.OneCinema.service.RoomService;
import com.MateuszLebioda.OneCinema.utils.formatters.Formatter;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/room")
@RestController
public class RoomController {

    @Autowired
    RoomService roomService;

    @Autowired
    Formatter formatter;


    //@ApiOperation(value = "Return simple set of film")
    @RequestMapping(value = "/getRooms", method = RequestMethod.GET)
    @ResponseBody
    public String getRooms() throws JsonProcessingException {
        return  formatter.returnJson(roomService.getAllRooms());
    }

    //@ApiOperation(value = "Return simple set of film")
    @PostMapping(value = "/getSeances",consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getSeances(@RequestBody SeanceRequestModel seanceRequestModel) throws JsonProcessingException {
        return formatter.returnJson(roomService.getSeancesFromSeanceRequestModel(seanceRequestModel));
    }

    //@ApiOperation(value = "Return screening room plan by seance Id")
    @RequestMapping(value = "/getPlanBySeance/{id}", method = RequestMethod.GET)
    @ResponseBody
    public String getScreeningRoomPlanBySeanceId(@PathVariable String id) throws JsonProcessingException, CannotFindObjectException {
        return formatter.returnJson(roomService.getPlanBySeanceId(id));
    }


    //@ApiOperation(value = "Return screening room plan")
    @RequestMapping(value = "/getPlan/{id}", method = RequestMethod.GET)
    @ResponseBody
    public String getScreeningRoomPlan(@PathVariable String id) throws JsonProcessingException, CannotFindObjectException {
        return formatter.returnJson(roomService.getPlanById(id));
    }
}
