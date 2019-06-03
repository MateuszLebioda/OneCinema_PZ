package com.MateuszLebioda.OneCinema.controller;


import com.MateuszLebioda.OneCinema.entity.Type;
import com.MateuszLebioda.OneCinema.entity.TypeRepository;
import com.MateuszLebioda.OneCinema.utils.formatters.Formatter;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/genders")
@RestController
//@Api("Genders")
public class TypeController {

    @Autowired
    TypeRepository typeRepository;

    @Autowired
    Formatter formatter;


    //@ApiOperation(value = "Return all genders")
    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    @ResponseBody
    public String getGenders() throws JsonProcessingException {
        List<String> genders = new ArrayList<>();
        for (Type type:typeRepository.findAll()){
            genders.add(type.getName());
        }
        return formatter.returnJson(genders);
    }
}
