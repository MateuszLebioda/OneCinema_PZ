package com.MateuszLebioda.OneCinema.Model.Sence;

import com.MateuszLebioda.OneCinema.entity.Seance;
import java.util.Calendar;
import java.util.Date;

public class DaySeancesApiModel {

    private int day;
    private SeanceApiModel seances;

    public DaySeancesApiModel(Seance seances) {
        setDay(seances.getStart());
        setSeances(new SeanceApiModel(seances));
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

    public SeanceApiModel getSeances() {
        return seances;
    }

    public void setSeances(SeanceApiModel seances) {
        this.seances = seances;
    }


}
