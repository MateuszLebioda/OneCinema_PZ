package com.MateuszLebioda.OneCinema.Model.ScreeningRoom;

import java.util.List;

public class MovieProcessingScreeningRoomRequestModel {
    private String id;
    private List<MovieProcessingWeekRequestModel> weeks;

    public boolean validate(){
        return  validateWeeks() &&
                validateEveryOneWeeks();
    }

    private boolean validateEveryOneWeeks(){
        for(MovieProcessingWeekRequestModel model: weeks){
            if(!model.validate())
                return false;
        }
        return true;
    }

    private boolean validateWeeks(){
        return weeks != null && weeks.size() > 0;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<MovieProcessingWeekRequestModel> getWeeks() {
        return weeks;
    }

    public void setWeeks(List<MovieProcessingWeekRequestModel> weeks) {
        this.weeks = weeks;
    }
}
