package com.MateuszLebioda.OneCinema.Model.Sence;


public class SeancesApiModelWithProjectionType extends  SeanceApiModel {

    private Dimension projectionType;

    public SeancesApiModelWithProjectionType(){

    }

    public Dimension getProjectionType() {
        return projectionType;
    }

    public void setProjectionType(Dimension projectionType) {
        this.projectionType = projectionType;
    }
}
