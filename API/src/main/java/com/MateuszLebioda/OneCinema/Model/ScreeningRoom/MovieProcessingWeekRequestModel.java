package com.MateuszLebioda.OneCinema.Model.ScreeningRoom;

import java.util.Set;

public class MovieProcessingWeekRequestModel {
   private int weekNumber;
   private Set<MovieProcessingDayRequestModel> days;

    public boolean validate(){
        return  validateWeekNumber() &&
                validateEveryOneDay();

    }

    private boolean validateEveryOneDay(){
        for(MovieProcessingDayRequestModel mode:days){
            if(!mode.validate()){
                return false;
            }
        }
        return true;
    }

    private boolean validateDays(){
        return days.size() > 0;
    }

    private boolean validateWeekNumber(){
        return  weekNumber >= 0;
    }

    public int getWeekNumber() {
        return weekNumber;
    }

    public void setWeekNumber(int weekNumber) {
        this.weekNumber = weekNumber;
    }

    public Set<MovieProcessingDayRequestModel> getDays() {
        return days;
    }

    public void setDays(Set<MovieProcessingDayRequestModel> days) {
        this.days = days;
    }
}
