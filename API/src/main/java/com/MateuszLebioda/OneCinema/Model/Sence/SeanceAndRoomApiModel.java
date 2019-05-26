package com.MateuszLebioda.OneCinema.Model.Sence;

import java.util.Date;

public class SeanceAndRoomApiModel {private String seanceId;
    private String movieTitle;
    private String screeningRoomId;
    private String screeningRoomName;
    private Dimension projectionType;
    private Date date;


    public String getSeanceId() {
        return seanceId;
    }

    public void setSeanceId(String seanceId) {
        this.seanceId = seanceId;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public String getScreeningRoomId() {
        return screeningRoomId;
    }

    public void setScreeningRoomId(String screeningRoomId) {
        this.screeningRoomId = screeningRoomId;
    }

    public String getScreeningRoomName() {
        return screeningRoomName;
    }

    public void setScreeningRoomName(String screeningRoomName) {
        this.screeningRoomName = screeningRoomName;
    }

    public Dimension getProjectionType() {
        return projectionType;
    }

    public void setProjectionType(Dimension projectionType) {
        this.projectionType = projectionType;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
