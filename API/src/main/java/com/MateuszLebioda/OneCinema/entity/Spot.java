package com.MateuszLebioda.OneCinema.entity;




import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;

@Entity
@Table(name = "Miejsce")
public class Spot {

    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @Column(name = "pozycja")
    private int position;

    @Column(name = "rzad")
    private int raw;

    @ManyToOne
    @JoinColumn(name = "id_sala")
    private Room room;

    @Column(name = "jest_miejscem")
    private boolean isPlace;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public int getRaw() {
        return raw;
    }

    public void setRaw(int raw) {
        this.raw = raw;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public boolean isPlace() {
        return isPlace;
    }

    public void setPlace(boolean place) {
        isPlace = place;
    }
}
