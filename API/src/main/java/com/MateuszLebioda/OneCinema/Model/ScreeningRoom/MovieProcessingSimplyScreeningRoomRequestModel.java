package com.MateuszLebioda.OneCinema.Model.ScreeningRoom;

import com.MateuszLebioda.OneCinema.utils.validators.ValidationErrors;
import com.MateuszLebioda.OneCinema.utils.validators.ValidatorStatus;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class MovieProcessingSimplyScreeningRoomRequestModel {
    private String id;
    private List<MovieProcessingSeanceTimeRequestModel> seances;

    @Autowired
    ValidatorStatus validatorStatus;

    public void validate(){
         validateEveryOneSeancesTime();
    }

    private void validateEveryOneSeancesTime(){
        for(MovieProcessingSeanceTimeRequestModel mode: seances){
            if(!mode.validate())
                validatorStatus.addError(ValidationErrors.WRONG_SEANCE_TIME);
        }
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<MovieProcessingSeanceTimeRequestModel> getSeances() {
        return seances;
    }

    public void setSeances(List<MovieProcessingSeanceTimeRequestModel> seances) {
        this.seances = seances;
    }
}
