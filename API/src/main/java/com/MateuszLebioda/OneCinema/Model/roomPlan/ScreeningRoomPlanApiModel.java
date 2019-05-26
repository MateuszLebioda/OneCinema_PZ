package com.MateuszLebioda.OneCinema.Model.roomPlan;

import java.util.List;

public class ScreeningRoomPlanApiModel {
    private String id;
    private String screeningRoomName;
    private List<ScreeningRoomPlanRowApiModel> rows;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getScreeningRoomName() {
        return screeningRoomName;
    }

    public void setScreeningRoomName(String screeningRoomName) {
        this.screeningRoomName = screeningRoomName;
    }

    public List<ScreeningRoomPlanRowApiModel> getRows() {
        return rows;
    }

    public void setRows(List<ScreeningRoomPlanRowApiModel> rows) {
        this.rows = rows;
    }


}
