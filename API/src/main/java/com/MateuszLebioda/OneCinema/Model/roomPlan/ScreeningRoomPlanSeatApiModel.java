package com.MateuszLebioda.OneCinema.Model.roomPlan;

public class ScreeningRoomPlanSeatApiModel {
    private String id;
    private int number;
    private boolean isSeat;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getNumber() {
        return number;
    }

    public void setSeat(int seat) {
        this.number = seat;
    }

    public boolean isSeat() {
        return isSeat;
    }

    public void setNumber(boolean number) {
        isSeat = number;
    }
}
