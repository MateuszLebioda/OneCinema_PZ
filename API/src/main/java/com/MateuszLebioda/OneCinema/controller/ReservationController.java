package com.MateuszLebioda.OneCinema.controller;


import com.MateuszLebioda.OneCinema.Model.Book.BookingRequestModel;
import com.MateuszLebioda.OneCinema.exception.CannotFindReservationException;
import com.MateuszLebioda.OneCinema.service.EmailService;
import com.MateuszLebioda.OneCinema.service.ReservationService;
import com.MateuszLebioda.OneCinema.utils.formatters.Formatter;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    Formatter formatter;

    @Autowired
    ReservationService reservationService;

    @Autowired
    EmailService emailService;

    //@ApiOperation(value = "Return reserved spots")
    @RequestMapping(value = "/getBySeanceId/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity getReserved(@PathVariable String id) throws JsonProcessingException {
        try {
            return new ResponseEntity(formatter.returnJson(reservationService.getReservationById(id)), HttpStatus.OK);
        } catch (CannotFindReservationException e) {
            return new ResponseEntity("Cannot find reservation",HttpStatus.BAD_REQUEST);
        }
    }

    //@ApiOperation(value = "Book spots")
    @RequestMapping(value = "/book", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity book(@RequestBody BookingRequestModel model){
        return  reservationService.addReservation(model);
    }
}
