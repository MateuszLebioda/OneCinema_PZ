package com.MateuszLebioda.OneCinema.Model.ScreeningRoom;

public class ScreeningRoomApiModel {

    private String id;
    private String name;
    private int breakBeforeAndAfterMovie;



    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getBreakBeforeAndAfterMovie() {
        return breakBeforeAndAfterMovie;
    }

    public void setBreakBeforeAndAfterMovie(int breakBeforeAndAfterMovie) {
        this.breakBeforeAndAfterMovie = breakBeforeAndAfterMovie;
    }
}
