package com.MateuszLebioda.OneCinema.Model.Sence;

import com.MateuszLebioda.OneCinema.entity.Seance;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public class DaySeancesApiModel {

    //TODO: Do poprawy generowanie wartosci dnia - sprobowac ograniczyc wartosci lecace z bazy!
    private int day;
    private SeanceApiModel seances;

    public DaySeancesApiModel(Seance seances) {
        setDay(seances.getStart().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate().getDayOfMonth());
        setSeances(new SeanceApiModel(seances));


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

    public void setDayBySeance(Seance seance){
        Date dateNow = new Date();
        LocalDate localDateNow = dateNow.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();

        LocalDate localDateSeance = seance.getStart().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        if (localDateNow.compareTo(localDateSeance)==0)
            this.day = 0;
    }

}
