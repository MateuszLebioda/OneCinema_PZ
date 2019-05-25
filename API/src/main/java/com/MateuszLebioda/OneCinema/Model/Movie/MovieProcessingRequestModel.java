package com.MateuszLebioda.OneCinema.Model.Movie;

import com.MateuszLebioda.OneCinema.utils.validators.ValidationErrors;
import com.MateuszLebioda.OneCinema.utils.validators.ValidatorStatus;
import org.apache.commons.validator.UrlValidator;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class MovieProcessingRequestModel {
    private String title;
    private int rating;
    private List<String> genders;
    private String posterUrl;
    private String trailerUrl;
    private int duration;

    @Autowired
    ValidatorStatus validatorStatus;

    public void validate(){
        validateTitle();
        validateDuration();
        validateRating();
        validateGraphic();
        validateTrailer();
    }

    private void validateTrailer(){
        if(!(validateURL(trailerUrl))){
            validatorStatus.addError(ValidationErrors.WRONG_TRAILER_URL);
        }
    }

    private void validateGraphic() {
        if(!(validateURL(posterUrl))){
            validatorStatus.addError(ValidationErrors.WRONG_POSTER_URL);
        }
    }

    private void validateTitle(){
        if(!(title.length() > 0 && title.length()<100)){
            validatorStatus.addError(ValidationErrors.WRONG_LENGTH_OF_TITLE);
        }
    }

    private void validateDuration(){
        if(!(duration > 1)){
            validatorStatus.addError(ValidationErrors.TO_SHORT_DURATION);
        }
    }

    private void validateRating(){
        if(!(rating >= 1.0 && rating <= 5.0)){
            validatorStatus.addError(ValidationErrors.RATING_IS_NOT_IN_THE_RANGE);
        }
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

    public List<String> getGenders() {
        return genders;
    }

    public void setGenders(List<String> genders) {
        this.genders = genders;
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

    /*public List<MovieProcessingScreeningRoomRequestModel> getScreeningRooms() {
        return screeningRooms;
    }

    public void setScreeningRooms(List<MovieProcessingScreeningRoomRequestModel> screeningRooms) {
        this.screeningRooms = screeningRooms;
    }*/
}
