package com.MateuszLebioda.OneCinema.controller;


import com.MateuszLebioda.OneCinema.service.ReservationService;
import com.MateuszLebioda.OneCinema.utils.formatters.Formatter;

import com.wordnik.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    Formatter formatter;

    @Autowired
    ReservationService reservationService;


    @ApiOperation(value = "Return reserved spots")
    @RequestMapping(value = "/getBySeanceId/{id}", method = RequestMethod.GET)
    @ResponseBody
    public List<String> getReserved(@PathVariable String id){
        return  reservationService.getReservationById(id);
    }
}
