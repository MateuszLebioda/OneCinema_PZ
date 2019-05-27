package com.MateuszLebioda.OneCinema.Model.Price;


import com.MateuszLebioda.OneCinema.entity.Price;

public class PricePerDayApiModel{

    PricePerDayApiModel(){

    }

    PricePerDayApiModel(Price price){
        mondayThursday = price.getMondayThursday();
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
