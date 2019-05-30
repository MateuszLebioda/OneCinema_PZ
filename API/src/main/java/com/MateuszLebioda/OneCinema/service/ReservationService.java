package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.entity.Reservation;
import com.MateuszLebioda.OneCinema.entity.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    ReservationRepository reservationRepository;

    public List<String> getReservationById(String id){

        List<String> idList = new ArrayList<>();
        for(Reservation reservation:reservationRepository.findAllBySeanceId(id)){
            idList.add(reservation.getId());
        }
        return  idList;
    }

}
