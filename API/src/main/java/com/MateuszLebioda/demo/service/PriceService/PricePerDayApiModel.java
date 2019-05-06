package com.MateuszLebioda.demo.service.PriceService;


import com.MateuszLebioda.demo.model.Price;

public class PricePerDayApiModel {

    PricePerDayApiModel(Price price) {
        mondayThursday = price.gestMondayThursday();
        fridaySunday = price.getFridaySunday();
    }

    private int mondayThursday;
    private int fridaySunday;

    public int getMondayThursday() {
        return mondayThursday;
    }

    public void setMondayThursday(int mondayThursday) {
        this.mondayThursday = mondayThursday;
    }

    public int getFridaySunday() {
        return fridaySunday;
    }

    public void setFridaySunday(int fridaySunday) {
        this.fridaySunday = fridaySunday;
    }
}
