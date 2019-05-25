package com.MateuszLebioda.OneCinema.controller;

import com.MateuszLebioda.OneCinema.utils.formatters.Formatter;
import com.MateuszLebioda.OneCinema.service.PriceService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.wordnik.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/price")
@RestController
public class PriceApiController {

    @Autowired
    PriceService priceService;

    @Autowired
    Formatter formatter;

    @ApiOperation(value = "Return price list")
    @RequestMapping(value = "/get", method = RequestMethod.GET)
    @ResponseBody
    public String spot() throws JsonProcessingException {
        return  formatter.returnJson(priceService.getPriceList());
    }

}
