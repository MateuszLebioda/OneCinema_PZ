package com.MateuszLebioda.OneCinema.Model.ScreeningRoom;

import com.MateuszLebioda.OneCinema.Model.Sence.Dimension;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class MovieProcessingSeanceTimeRequestModel {
    private Dimension projectionType;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy kk:mm", timezone = "CEST")
    private Date start;

    public boolean validate(){
        return validateProjectionType();
    }

    private boolean validateProjectionType(){
        return projectionType != null;
    }

    private boolean validateStart(){
        return start != null;
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
}
