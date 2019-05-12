package com.MateuszLebioda.OneCinema.Model.ScreeningRoom;

import java.util.List;

public class MovieProcessingDayRequestModel {
    private WeekDays day;
    private List<MovieProcessingSeanceTimeRequestModel> seancesTimes;


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
