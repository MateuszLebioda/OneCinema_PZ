package com.MateuszLebioda.demo.controller;

import com.MateuszLebioda.demo.service.Formatter;
import com.MateuszLebioda.demo.service.PriceService.PriceService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RequestMapping
@RestController
public class PriceApiController {

    @Autowired
    PriceService priceService;

    @Autowired
    Formatter formatter;

    @RequestMapping(value = "/price", method = RequestMethod.GET)
    @ResponseBody
    public String spot() throws JsonProcessingException {
        return  formatter.returnJson(priceService.getPriceList());
    }

}
