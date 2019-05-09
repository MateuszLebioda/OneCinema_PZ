package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.Model.Cinema.CinemaApiModel;
import com.MateuszLebioda.OneCinema.entity.Cinema;
import com.MateuszLebioda.OneCinema.entity.CinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CinemaService {

    final String ID_MAIN_CINEMA = "79da5d32-a105-4e81-b146-05762a67a56f";

    @Autowired
    CinemaRepository cinemaRepository;

    public CinemaApiModel getMainCinema(){
        Optional<Cinema> optionalCinema = cinemaRepository.findById("79da5d32-a105-4e81-b146-05762a67a56f");
        if(optionalCinema.isPresent()){
            Cinema cinema = optionalCinema.get();
            return new CinemaApiModel(cinema);
        }
        return null;
    }


}
