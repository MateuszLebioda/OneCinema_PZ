package com.MateuszLebioda.OneCinema.Model.Sence;

import com.MateuszLebioda.OneCinema.entity.Seance;

public class SeancesApiModelWithProjectionType extends  SeanceApiModel {

    private Dimension projectionType;

    public SeancesApiModelWithProjectionType(){

    }

    public SeancesApiModelWithProjectionType(Seance seances) {
        super(seances);
    }

    public Dimension getProjectionType() {
        return projectionType;
    }

    public void setProjectionType(Dimension projectionType) {
        this.projectionType = projectionType;
    }
}
