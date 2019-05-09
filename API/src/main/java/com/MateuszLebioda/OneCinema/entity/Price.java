package com.MateuszLebioda.OneCinema.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "Cennik")
public class Price {
    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;


    @Column(name = "cena_pon_pt")
    int mondayThursday;

    @Column(name = "cena_pt_nd")
    int fridaySunday;

    @Column(name = "typ")
    String type;

    @Column(name = "seans")
    String seance;

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSeance() {
        return seance;
    }

    public void setSeance(String seans) {
        this.seance = seans;
    }
}
