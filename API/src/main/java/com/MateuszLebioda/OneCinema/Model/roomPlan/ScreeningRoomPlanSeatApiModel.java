package com.MateuszLebioda.OneCinema.Model.roomPlan;

public class ScreeningRoomPlanSeatApiModel {
    private String id;
    private int seat;
    private boolean isPlaced;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getSeat() {
        return seat;
    }

    public void setPlaced(int placed) {
        this.seat = placed;
    }

    public boolean isPlaced() {
        return isPlaced;
    }

    public void setSeat(boolean seat) {
        isPlaced = seat;
    }
}
