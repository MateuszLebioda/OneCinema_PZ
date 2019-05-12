package com.MateuszLebioda.OneCinema.Model.Movie;

import com.MateuszLebioda.OneCinema.Model.Gender.MovieGender;
import com.MateuszLebioda.OneCinema.Model.ScreeningRoom.MovieProcessingScreeningRoomRequestModel;
import org.apache.commons.validator.UrlValidator;

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
        return  validateTitle() &&
                validateDuration() &&
                validateGender() &&
                validateRating() &&
                validateGraphic() &&
                validateTrailer();
                //TODO: validation screeningRoom
    }

    private boolean validateTrailer(){
        return  validateURL(trailerUrl);
    }

    private boolean validateGraphic() {
        return validateURL(posterUrl);
    }

    private boolean validateTitle(){
        return title.length() > 0 && title.length()<100;
    }

    private boolean validateDuration(){
        return duration > 1;
    }

    private boolean validateGender(){
        //return gender.size() >= 1;
        return true;
    }

    private boolean validateRating(){
        return rating >= 1.0 && rating <= 5.0;
    }

    private boolean validateURL(String url){
        UrlValidator  urlValidator = new UrlValidator();
        return urlValidator.isValid(url);
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
