package com.MateuszLebioda.OneCinema.Model.Movie;

import com.MateuszLebioda.OneCinema.Model.Gender.MovieGender;
import com.MateuszLebioda.OneCinema.Model.ScreeningRoom.MovieProcessingScreeningRoomRequestModel;
import java.util.Set;

public class MovieProcessingRequestModel {
    private String title;
    private int rating;
    private Set<MovieGender> gender;
    private String posterUrl;
    private String trailerUrl;
    private int duration;
    private Set<MovieProcessingScreeningRoomRequestModel> screeningRoom;

    public boolean validate(){
        if(title.length()<15)
            return true;
        else
            return false;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Set<MovieGender> getGender() {
        return gender;
    }

    public void setGender(Set<MovieGender> gender) {
        this.gender = gender;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public String getTrailerUrl() {
        return trailerUrl;
    }

    public void setTrailerUrl(String trailerUrl) {
        this.trailerUrl = trailerUrl;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Set<MovieProcessingScreeningRoomRequestModel> getScreeningRoom() {
        return screeningRoom;
    }

    public void setScreeningRoom(Set<MovieProcessingScreeningRoomRequestModel> screeningRoom) {
        this.screeningRoom = screeningRoom;
    }
}
