package com.MateuszLebioda.OneCinema.Model.Sence;

public enum Dimension {
    _3D("3D"),_2D("2D");

    private String value;

    Dimension(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
