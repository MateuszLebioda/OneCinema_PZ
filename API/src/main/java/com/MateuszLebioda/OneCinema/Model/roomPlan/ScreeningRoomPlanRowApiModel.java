package com.MateuszLebioda.OneCinema.Model.roomPlan;

import java.util.List;

public class ScreeningRoomPlanRowApiModel {
    private List<ScreeningRoomPlanSeatApiModel> seats;
    private int row;

    public List<ScreeningRoomPlanSeatApiModel> getSeats() {
        return seats;
    }

    public void setSeats(List<ScreeningRoomPlanSeatApiModel> seats) {
        this.seats = seats;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }
}
