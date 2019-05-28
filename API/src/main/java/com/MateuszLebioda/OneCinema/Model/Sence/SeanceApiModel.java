package com.MateuszLebioda.OneCinema.Model.Sence;


import java.util.Date;

public class SeanceApiModel {
    public String id;
    public Date start;
    public Date finish;



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
