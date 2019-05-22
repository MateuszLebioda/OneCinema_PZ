package com.MateuszLebioda.OneCinema.Model.Sence;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Dimension {
    _3D("3D"),_2D("2D");

    private String value;

    Dimension(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
