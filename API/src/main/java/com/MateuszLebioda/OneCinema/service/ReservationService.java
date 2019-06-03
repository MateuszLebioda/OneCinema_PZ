package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.Model.Book.BookingRequestModel;
import com.MateuszLebioda.OneCinema.entity.Reservation;
import com.MateuszLebioda.OneCinema.entity.ReservationRepository;
import com.MateuszLebioda.OneCinema.exception.CannotFindReservationException;
import com.MateuszLebioda.OneCinema.exception.CannotFindSeanceException;
import com.MateuszLebioda.OneCinema.exception.CannotFindSpotException;
import com.MateuszLebioda.OneCinema.exception.ReservationAlreadyExist;
import com.MateuszLebioda.OneCinema.utils.mappers.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    BookMapper bookMapper;

    @Autowired
    EmailService emailService;

    public List<String> getReservationById(String id) throws CannotFindReservationException {

        List<String> idList = new ArrayList<>();
        List<Reservation> reservations = reservationRepository.findAllBySeanceId(id);
        if(reservations.size() == 0){
            throw new CannotFindReservationException();
        }
        for(Reservation reservation:reservations){
            idList.add(reservation.getSpot().getId());
        }
        return  idList;
    }

    public ResponseEntity addReservation(BookingRequestModel bookingRequestModel){
        try {
            List<Reservation> reservations = bookMapper.mapBookingRequestModel(bookingRequestModel);
            emailService.sendEmail(bookingRequestModel.getClientEmail());
            reservationRepository.saveAll(reservations);
            return new ResponseEntity("Succes",HttpStatus.OK);
        } catch (CannotFindSeanceException e) {
            return new ResponseEntity("Cannot find Seance",HttpStatus.BAD_REQUEST);
        } catch (ReservationAlreadyExist reservationAlreadyExist) {
            return new ResponseEntity("Miejsce jest juz zarezerwowane",HttpStatus.BAD_REQUEST);
        } catch (CannotFindSpotException e) {
            return new ResponseEntity("Nie znaleziono miejsca",HttpStatus.BAD_REQUEST);
        }
    }

}
