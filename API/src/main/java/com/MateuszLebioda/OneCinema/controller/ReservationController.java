package com.MateuszLebioda.OneCinema.controller;


import com.MateuszLebioda.OneCinema.Model.Book.BookingRequestModel;
import com.MateuszLebioda.OneCinema.service.EmailService;
import com.MateuszLebioda.OneCinema.service.ReservationService;
import com.MateuszLebioda.OneCinema.utils.formatters.Formatter;

import org.springframework.beans.factory.annotation.Autowired;
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
    public List<String> getReserved(@PathVariable String id){
        return  reservationService.getReservationById(id);
    }

    //@ApiOperation(value = "Book spots")
    @RequestMapping(value = "/book", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity book(@RequestBody BookingRequestModel model){
        return  reservationService.addReservation(model);
    }
}
