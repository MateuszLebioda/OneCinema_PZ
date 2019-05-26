package com.MateuszLebioda.OneCinema.Model.Sence;

import com.MateuszLebioda.OneCinema.entity.Seance;

import java.util.Date;

public class SeanceApiModel {
    public String id;
    public Date start;
    public Date finish;

    public SeanceApiModel(){

    };

    public SeanceApiModel(Seance seances) {
        setId(seances.getId());
        setStart(seances.getStart());
        setFinish(new Date(seances.getStart().getTime() + seances.getFilm().getDuration()*60*1000));
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getFinish() {
        return finish;
    }

    public void setFinish(Date finish) {
        this.finish = finish;
    }

}
