package com.MateuszLebioda.OneCinema.Model.Sence;

import java.util.Date;

public class SeanceApiModelFull {
    private String seanceId;
    private String title;
    private Dimension projectionType;
    private Date start;
    private Date finish;



    public String getSeanceId() {
        return seanceId;
    }

    public void setSeanceId(String seanceId) {
        this.seanceId = seanceId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Dimension getProjectionType() {
        return projectionType;
    }

    public void setProjectionType(Dimension projectionType) {
        this.projectionType = projectionType;
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
