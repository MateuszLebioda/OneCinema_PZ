package com.MateuszLebioda.OneCinema.Model.Book;

import java.util.ArrayList;
import java.util.List;

public class BookingRequestModel {
    private String seanceId;
    private String clientFirstname;
    private String clientSurname;
    private String clientEmail;
    private List<BookedSeatApiModel> bookedSeats;


    public String getSeanceId() {
        return seanceId;
    }

    public void setSeanceId(String seanceId) {
        this.seanceId = seanceId;
    }

    public String getClientFirstname() {
        return clientFirstname;
    }

    public void setClientFirstname(String clientFirstname) {
        this.clientFirstname = clientFirstname;
    }

    public String getClientSurname() {
        return clientSurname;
    }

    public void setClientSurname(String clientSurname) {
        this.clientSurname = clientSurname;
    }

    public String getClientEmail() {
        return clientEmail;
    }

    public void setClientEmail(String clientEmail) {
        this.clientEmail = clientEmail;
    }

    public List<BookedSeatApiModel> getBookedSeats() {
        return bookedSeats;
    }

    public void setBookedSeats(List<BookedSeatApiModel> bookedSeats) {
        this.bookedSeats = bookedSeats;
    }

    public List<String> getBookedSeatsId(){
        List<String> bookedSeatIdList = new ArrayList<>();

        for(BookedSeatApiModel bookSeats:bookedSeats){
            bookedSeatIdList.add(bookSeats.getId());
        }

        return bookedSeatIdList;
    }
}
