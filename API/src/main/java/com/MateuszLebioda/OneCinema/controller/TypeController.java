package com.MateuszLebioda.OneCinema.controller;


import com.MateuszLebioda.OneCinema.entity.Type;
import com.MateuszLebioda.OneCinema.entity.TypeRepository;
import com.wordnik.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/genders")
@RestController
public class TypeController {

    @Autowired
    TypeRepository typeRepository;


    @ApiOperation(value = "Return all genders")
    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    @ResponseBody
    public List<String> getGenders() {
        List<String> genders = new ArrayList<>();
        for (Type type:typeRepository.findAll()){
            genders.add(type.getName());
        }
        return genders;
    }
}
