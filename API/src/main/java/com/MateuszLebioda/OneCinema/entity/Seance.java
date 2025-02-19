package com.MateuszLebioda.OneCinema.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "seans")
public class Seance {

    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @Column(name = "data_rozpoczecia")
    private Date start;

    @OneToMany(mappedBy = "seance",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private Set<Reservation> reservations;

    @Column(name = "czy_3d")
    private boolean is3D;

    @ManyToOne()
    @JoinColumn(name = "id_film")
    private Film film;

    @ManyToOne()
    @JoinColumn(name = "id_sala")
    private Room room;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public boolean isIs3D() {
        return is3D;
    }

    public void setIs3D(boolean is3D) {
        this.is3D = is3D;
    }

    public Set<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
    }

    public Film getFilm() {
        return film;
    }

    public void setFilm(Film film) {
        this.film = film;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }
}
