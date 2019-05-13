package com.MateuszLebioda.OneCinema.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;


@Entity
@Table(name = "rezerwacja")
public class Reservation {

    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;


    @ManyToOne
    @JoinColumn(name = "id_miejsce")
    private Spot spot;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_seans")
    private Seance seance;

    @Column(name = "zajete")
    boolean occupied;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Spot getSpot() {
        return spot;
    }

    public void setSpot(Spot spot) {
        this.spot = spot;
    }

    public Seance getSeance() {
        return seance;
    }

    public void setSeance(Seance seance) {
        this.seance = seance;
    }

    public boolean isOccupied() {
        return occupied;
    }

    public void setOccupied(boolean occupied) {
        this.occupied = occupied;
    }
}
