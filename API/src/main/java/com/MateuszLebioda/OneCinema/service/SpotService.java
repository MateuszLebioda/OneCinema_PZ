package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.entity.Spot;
import com.MateuszLebioda.OneCinema.entity.SpotRepository;
import com.MateuszLebioda.OneCinema.exception.CannotFindObjectException;
import com.MateuszLebioda.OneCinema.exception.CannotFindSeanceException;
import com.MateuszLebioda.OneCinema.exception.CannotFindSpotException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SpotService {

    @Autowired
    SpotRepository spotRepository;

    public Spot getSpotById(String id) throws CannotFindSpotException {
        Optional<Spot> spot = spotRepository.findById(id);
        if(spot.isPresent()){
            return spot.get();
        }
        throw new CannotFindSpotException();
    }

}
