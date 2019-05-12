package com.MateuszLebioda.OneCinema.Model.Movie;

import com.MateuszLebioda.OneCinema.Model.ScreeningRoom.MovieProcessingScreeningRoomRequestModel;
import org.apache.commons.validator.UrlValidator;

import java.util.List;
import java.util.Set;

public class MovieProcessingRequestModel {
    private String title;
    private int rating;
    private List<String> genders;
    private String posterUrl;
    private String trailerUrl;
    private int duration;
    private Set<MovieProcessingScreeningRoomRequestModel> screeningRoom;

    public boolean validate(List<String>genders){
        return  validateTitle() &&
                validateDuration() &&
                validateRating() &&
                validateGraphic() &&
                validateTrailer() &&
                validateGender(genders);
    }

    private boolean validateGender(List<String>genders){
        if(this.genders != null && this.genders.size()>0){
            for(String movieGender:this.genders){
                if(!genders.contains(movieGender))
                    return false;
            }
            return true;
        }
        return false;
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

    public Set<MovieProcessingScreeningRoomRequestModel> getScreeningRoom() {
        return screeningRoom;
    }

    public void setScreeningRoom(Set<MovieProcessingScreeningRoomRequestModel> screeningRoom) {
        this.screeningRoom = screeningRoom;
    }
}
