package com.MateuszLebioda.OneCinema.Model.Cinema;

import com.MateuszLebioda.OneCinema.entity.Cinema;
import com.MateuszLebioda.OneCinema.entity.Room;

import java.util.Set;

public class CinemaApiModel {
    private String name;
    private String description;
    private String photoUrl;
    private String address;
    private String phoneNumber;
    private String email;
    private int screeningInRoomsCount;
    private int seatsCount;

    public CinemaApiModel(Cinema cinema) {
        setName(cinema.getName());
        setDescription(cinema.getDescription());
        setPhotoUrl(cinema.getPhoto());
        setAddress(cinema.getCity() + " " + cinema.getStreet() + " " + cinema.getNumber());
        setPhoneNumber(cinema.getPhone());
        setEmail(cinema.geteMail());
        setScreeningInRoomsCount(cinema.getRooms().size());
        setSeatsCount(cinema.getRooms());
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getScreeningInRoomsCount() {
        return screeningInRoomsCount;
    }

    public void setScreeningInRoomsCount(int screeningInRoomsCount) {
        this.screeningInRoomsCount = screeningInRoomsCount;
    }

    public int getSeatsCount() {
        return seatsCount;
    }

    public void setSeatsCount(int seatsCount) {
        this.seatsCount = seatsCount;
    }

    public void setSeatsCount(Set<Room> roomSet) {
        int count = 0;
        for(Room rom:roomSet){
           count += rom.getSpots().size();
        }
        this.seatsCount = count;
    }
}
