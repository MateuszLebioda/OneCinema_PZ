package com.MateuszLebioda.OneCinema.Model.ScreeningRoom;

public enum WeekDays {
    MONDAY("Monday"),
    TUESDAY("Tuesday"),
    WEDNESDAY("Wednesday"),
    THURSDAY("Thursday"),
    FRIDAY("Friday"),
    SATURDAY("Saturday"),
    SUNDAY("Sunday");

    private String day;

    WeekDays(String day) {
        this.day = day;
    }
    public String getDay(){
        return this.day;
    }
}
