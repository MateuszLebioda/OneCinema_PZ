package com.MateuszLebioda.OneCinema.Model.ScreeningRoom;

import java.util.List;

public class MovieProcessingWeekRequestModel {
   private int weekNumber;
   private List<MovieProcessingDayRequestModel> days;



    public int getWeekNumber() {
        return weekNumber;
    }

    public void setWeekNumber(int weekNumber) {
        this.weekNumber = weekNumber;
    }

    public List<MovieProcessingDayRequestModel> getDays() {
        return days;
    }

    public void setDays(List<MovieProcessingDayRequestModel> days) {
        this.days = days;
    }
}
