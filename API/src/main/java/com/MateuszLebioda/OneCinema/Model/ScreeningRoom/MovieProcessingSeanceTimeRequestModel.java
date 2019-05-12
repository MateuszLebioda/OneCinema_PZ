package com.MateuszLebioda.OneCinema.Model.ScreeningRoom;

import com.MateuszLebioda.OneCinema.Model.Sence.Dimension;

import java.util.Date;

public class MovieProcessingSeanceTimeRequestModel {
    private Dimension projectionType;
    private Date start;



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
}
