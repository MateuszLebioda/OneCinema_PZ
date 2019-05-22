package com.MateuszLebioda.OneCinema.Model.Movie;

import com.MateuszLebioda.OneCinema.Model.ScreeningRoom.MovieProcessingSeanceTimeRequestModel;
import com.MateuszLebioda.OneCinema.Model.ScreeningRoom.MovieProcessingSimplyScreeningRoomRequestModel;
import com.MateuszLebioda.OneCinema.service.validator.ValidationErrors;
import com.MateuszLebioda.OneCinema.service.validator.ValidatorStatus;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

public class MovieProcessingAddMovieFilmRequestMode extends MovieProcessingRequestModel {
    private List<MovieProcessingSimplyScreeningRoomRequestModel> screeningRooms;

    @Autowired
    ValidatorStatus validationStatus;

    @Override
    public void validate() {
         super.validate();
                validateScreeningRooms();
                validateScreeningRoomsIdInSet();
    }



    private void validateScreeningRooms(){
        for(MovieProcessingSimplyScreeningRoomRequestModel mode: screeningRooms){
            mode.validate();
        }
    }

    private void validateScreeningRoomsIdInSet(){
        for(int i = 0;i<screeningRooms.size();i++){
            for(int j = 0;j<screeningRooms.size();j++){
                if(i!=j && screeningRooms.get(i).equals(screeningRooms.get(j)))
                    validationStatus.addError(ValidationErrors.SEANCE_HAVE_TO_HAS_UNIQUE_ID);
            }
        }
    }

    public List<MovieProcessingSimplyScreeningRoomRequestModel> getScreeningRooms() {
        return screeningRooms;
    }

    public void setScreeningRooms(List<MovieProcessingSimplyScreeningRoomRequestModel> screeningRooms) {
        this.screeningRooms = screeningRooms;
    }

    public List<String> getScreeningRoomsIdList(){
        List<String> screeningRoomsIdList = new ArrayList<>();
        for (MovieProcessingSimplyScreeningRoomRequestModel model: this.screeningRooms){
            screeningRoomsIdList.add(model.getId());
        }
        return screeningRoomsIdList;
    }

    public Map<String,List<Date>> getDateSeancesTime(){
        Map<String,List<Date>> screeningRoomsDateMap = new HashMap<>();
        for(MovieProcessingSimplyScreeningRoomRequestModel screeningRoom: getScreeningRooms()){
            List<Date> screeningRoomSeanceDate = new ArrayList<>();
            for(MovieProcessingSeanceTimeRequestModel seance:screeningRoom.getSeances()){
                screeningRoomSeanceDate.add(seance.getStart());
            }
            screeningRoomsDateMap.put(screeningRoom.getId(),screeningRoomSeanceDate);
        }
        return screeningRoomsDateMap;
    }
}
