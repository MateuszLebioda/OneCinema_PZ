package com.MateuszLebioda.OneCinema.controller;

import com.MateuszLebioda.OneCinema.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/email")
@RestController
public class EmailController {

    @Autowired
    EmailService emailService;


    @RequestMapping(value = "/sendTo/{to}", method = RequestMethod.GET)
    @ResponseBody
    public String sendEmail(@PathVariable String to) {
        emailService.sendEmail(to,"haha");
        return "ciekawe";
    }


}
