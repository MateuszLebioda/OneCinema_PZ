package com.MateuszLebioda.OneCinema.Model.ScreeningRoom;

import com.MateuszLebioda.OneCinema.Model.Sence.Dimension;
import com.MateuszLebioda.OneCinema.utils.DateFormat;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Calendar;
import java.util.Date;

public class MovieProcessingSeanceTimeRequestModel {

    private Dimension projectionType;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DateFormat.FORMAT, timezone = "CET")
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
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(start);
        calendar.add(Calendar.HOUR_OF_DAY, 2);
        this.start = calendar.getTime();
    }

}
