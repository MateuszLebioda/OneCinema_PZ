package com.MateuszLebioda.OneCinema.utils.mappers;

import com.MateuszLebioda.OneCinema.Model.Book.BookedSeatApiModel;
import com.MateuszLebioda.OneCinema.Model.Book.BookingRequestModel;
import com.MateuszLebioda.OneCinema.entity.Reservation;
import com.MateuszLebioda.OneCinema.entity.Seance;
import com.MateuszLebioda.OneCinema.exception.CannotFindObjectException;
import com.MateuszLebioda.OneCinema.exception.CannotFindSeanceException;
import com.MateuszLebioda.OneCinema.exception.CannotFindSpotException;
import com.MateuszLebioda.OneCinema.exception.ReservationAlreadyExist;
import com.MateuszLebioda.OneCinema.service.ReservationService;
import com.MateuszLebioda.OneCinema.service.SeanceService;
import com.MateuszLebioda.OneCinema.service.SpotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookMapper {

    @Autowired
    ReservationService reservationService;

    @Autowired
    SeanceService seanceService;

    @Autowired
    SpotService spotService;

    public List<Reservation> mapBookingRequestModel(BookingRequestModel model) throws CannotFindSeanceException, ReservationAlreadyExist, CannotFindSpotException {
        List<Reservation> reservations = new ArrayList<>();
        try {
            Seance seance = seanceService.getSeanceById(model.getSeanceId());

            if(seanceService.haveReservedThisPlace(seance,model.getBookedSeatsId()))
                throw new ReservationAlreadyExist();
            for(BookedSeatApiModel bookedSeatApiModel:model.getBookedSeats()){
                Reservation reservation = new Reservation();
                reservation.setSeance(seance);
                reservation.setEmail(model.getClientEmail());
                reservation.setFirstName(model.getClientFirstname());
                reservation.setLastName(model.getClientSurname());
                reservation.setSpot(spotService.getSpotById(bookedSeatApiModel.getId()));
                reservation.setReduced(bookedSeatApiModel.isReducedPrice());
                reservations.add(reservation);
            }
        } catch (CannotFindObjectException e) {
            throw new CannotFindSeanceException();
        }
        return reservations;
    }




}
