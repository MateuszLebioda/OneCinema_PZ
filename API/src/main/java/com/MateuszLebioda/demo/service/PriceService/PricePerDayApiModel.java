package com.MateuszLebioda.demo.service.PriceService;


import com.MateuszLebioda.demo.model.Price;

import java.io.Serializable;

public class PricePerDayApiModel{

    PricePerDayApiModel(Price price){
        mondayThusday = price.getMondayThursday();
        fridaySunday = price.getFridaySunday();
    }

    private int mondayThusday;
    private int fridaySunday;

    public int getMondayThusday() {
        return mondayThusday;
    }

    public void setMondayThusday(int mondayThusday) {
        this.mondayThusday = mondayThusday;
    }

    public int getFridaySunday() {
        return fridaySunday;
    }

    public void setFridaySunday(int fridaySunday) {
        this.fridaySunday = fridaySunday;
    }
}
