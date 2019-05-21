package com.MateuszLebioda.OneCinema.Model.ScreeningRoom;

import java.util.List;

public class MovieProcessingDayRequestModel {
    private WeekDays day;
    private List<MovieProcessingSeanceTimeRequestModel> seancesTimes;

    public boolean validate(){
        return validateDay() &&
                validateEveryOneSeancesTime();
    }

    private boolean validateEveryOneSeancesTime(){
        for(MovieProcessingSeanceTimeRequestModel mode: seancesTimes){
            if(!mode.validate())
                return false;
        }
        return true;
    }

    private boolean validateDay(){
        return day != null;
    }

    private boolean validateSeancesTimes(){
        return  seancesTimes.size() > 0;
    }

    public WeekDays getDay() {
        return day;
    }

    public void setDay(WeekDays day) {
        this.day = day;
    }

    public List<MovieProcessingSeanceTimeRequestModel> getSeancesTimes() {
        return seancesTimes;
    }

    public void setSeancesTimes(List<MovieProcessingSeanceTimeRequestModel> seancesTimes) {
        this.seancesTimes = seancesTimes;
    }
}
