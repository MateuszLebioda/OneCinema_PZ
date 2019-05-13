package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.Model.Sence.Dimension;
import com.MateuszLebioda.OneCinema.entity.Film;
import com.MateuszLebioda.OneCinema.entity.Seance;
import com.MateuszLebioda.OneCinema.entity.SeanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.Set;

@Service
public class SeanceService {

    @Autowired
    SeanceRepository seanceRepository;

    public Set<Seance> getCurrentSeances(Film film, Dimension dimension){
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH,7);
        Date end  = calendar.getTime();
        switch (dimension){
            case _2D:
                return  seanceRepository.findByFilmAndIs3DAndStartBetween(film,false,new Date(),end);
            case _3D:
                return seanceRepository.findByFilmAndIs3DAndStartBetween(film,true,new Date(),end);
            default:
                return null;
        }
    }

}
