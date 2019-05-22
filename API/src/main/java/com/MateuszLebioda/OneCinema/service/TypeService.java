package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.entity.Type;
import com.MateuszLebioda.OneCinema.entity.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class TypeService {

    @Autowired
    TypeRepository typeRepository;

    public List<String> getTypeList(){
        List<String> genders = new ArrayList<>();
        List<Type> types = typeRepository.findAll();
        for(Type type:types){
            genders.add(type.getName());
        }
        return genders;
    }

    public Type getTypeById(String name){
        return  typeRepository.findByName(name);
    }

    public Set<Type> getTypesById(List<String> names){
        return  typeRepository.findByNameIn(names);
    }
}
