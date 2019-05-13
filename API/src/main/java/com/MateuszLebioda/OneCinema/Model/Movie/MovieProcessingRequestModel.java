package com.MateuszLebioda.OneCinema.Model.Movie;

import com.MateuszLebioda.OneCinema.Model.ScreeningRoom.MovieProcessingScreeningRoomRequestModel;
import org.apache.commons.validator.UrlValidator;

import java.util.ArrayList;
import java.util.List;

public class MovieProcessingRequestModel {
    private String title;
    private int rating;
    private List<String> genders;
    private String posterUrl;
    private String trailerUrl;
    private int duration;
    private List<MovieProcessingScreeningRoomRequestModel> screeningRooms;

    public boolean validate(List<String>genders,List<String> screeningRooms){
        return  validateTitle() &&
                validateDuration() &&
                validateRating() &&
                validateGraphic() &&
                validateTrailer() &&
                validateGender(genders) &&
                validateScreeningRooms(screeningRooms);
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

    private boolean validateScreeningRooms(List<String> seancesId){
        if(this.screeningRooms!= null) {
            return  validateScreeningRoomsWithDatabase(seancesId) && validateScreeningRoomsWithItself();
        }
        return true;
    }

    private List<String> getScreeningRoomsIdList(){
        List<String> screeningRoomsIdList = new ArrayList<>();
        for (MovieProcessingScreeningRoomRequestModel model: this.screeningRooms){
            screeningRoomsIdList.add(model.getId());
        }
        return screeningRoomsIdList;
    }

    private boolean validateScreeningRoomsWithDatabase(List<String> seancesId){
        for (String screeningRoomsId : getScreeningRoomsIdList()) {
            if (!seancesId.contains(screeningRoomsId))
                return false;
        }
        return true;
    }

    private boolean validateScreeningRoomsWithItself(){

        for(int i = 0;i<screeningRooms.size();i++){
            for(int j = 0;j<screeningRooms.size();j++){
               if(i!=j && screeningRooms.get(i).getId().equals(screeningRooms.get(j).getId()))
                   return false;
            }
        }
        return true;
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

    public List<MovieProcessingScreeningRoomRequestModel> getScreeningRooms() {
        return screeningRooms;
    }

    public void setScreeningRooms(List<MovieProcessingScreeningRoomRequestModel> screeningRooms) {
        this.screeningRooms = screeningRooms;
    }
}
