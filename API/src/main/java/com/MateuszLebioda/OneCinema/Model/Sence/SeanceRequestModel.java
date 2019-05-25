package com.MateuszLebioda.OneCinema.Model.Sence;

import com.MateuszLebioda.OneCinema.utils.formatters.DateFormat;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Calendar;
import java.util.Date;

public class SeanceRequestModel {
    private String screeningRoomId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DateFormat.FORMAT, timezone = "CET")
    private Date date;


    public String getScreeningRoomId() {
        return screeningRoomId;
    }

    public void setScreeningRoomId(String screeningRoomId) {
        this.screeningRoomId = screeningRoomId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getMidNightStartDate(){
        return  getMidnight(0);
    }

    public Date getMidNightEndDate(){
        return  getMidnight(24);
    }

    public Date getMidnight(int hour){
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH,-1);
        calendar.set(Calendar.HOUR_OF_DAY,hour);
        calendar.set(Calendar.MINUTE,0);
        calendar.set(Calendar.SECOND,0);
        calendar.set(Calendar.MILLISECOND,0);
        return calendar.getTime();
    }

}
