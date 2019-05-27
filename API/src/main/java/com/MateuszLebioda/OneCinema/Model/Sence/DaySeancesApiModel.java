package com.MateuszLebioda.OneCinema.Model.Sence;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class DaySeancesApiModel {

    private int day;
    private List<SeanceApiModel> seances;

    public DaySeancesApiModel(){

    }


    private void setDay(Date day) {
        Calendar nowCalendar = Calendar.getInstance();
        Calendar seanceStartCalendar = Calendar.getInstance();
        seanceStartCalendar.setTime(day);
        this.day = seanceStartCalendar.get(Calendar.DAY_OF_MONTH) - nowCalendar.get(Calendar.DAY_OF_MONTH);
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public List<SeanceApiModel> getSeances() {
        return seances;
    }

    public void setSeances(List<SeanceApiModel> seances) {
        this.seances = seances;
    }
}
