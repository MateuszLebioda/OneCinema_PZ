package com.MateuszLebioda.OneCinema.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Entity
@Table(name = "film")
public class Film {

    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @Column(name = "tytul")
    private String title;

    @Column(name = "rezyser")
    private String director;

    @OneToMany(mappedBy = "film")
    private Set<Seance> seances;

    @ManyToMany
    @JoinTable(
            name = "gatunek_film",
            joinColumns = @JoinColumn(name = "id_film"),
            inverseJoinColumns = @JoinColumn(name = "id_ts_gatunek"))
    private Set<Type> types;

    @Column(name = "premiera")
    private Date premiere;

    @Column(name = "Czas_trwania")
    private int duration;

    @Column(name = "url_grafika")
    private String graphic;

    @Column(name = "url_zwiastun")
    private String trailer;

    @Column(name = "ocena")
    private double rating;

    @Transient
    private Set<Seance>seances3D;

    @Transient
    private Set<Seance>seances2D;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public Date getPremiere() {
        return premiere;
    }

    public void setPremiere(Date premiere) {
        this.premiere = premiere;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Set<Type> getTypes() {
        return types;
    }

    public void setTypes(Set<Type> type) {
        this.types = type;
    }

    public void addType(Type type){
        this.types.add(type);
    }

    public void addTypes(List<Type> type){
        this.types.addAll(type);
    }

    public Set<Seance> getSeances() {
        return seances;
    }

    public void setSeances(Set<Seance> seances) {
        this.seances = seances;
    }

    public String getGraphic() {
        return graphic;
    }

    public void setGraphic(String graphic) {
        this.graphic = graphic;
    }

    public String getTrailer() {
        return trailer;
    }

    public void setTrailer(String trailer) {
        this.trailer = trailer;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public Set<Seance> getSeances3D() {
        return seances3D;
    }

    public void setSeances3D(Set<Seance> seances3D) {
        this.seances3D = seances3D;
    }

    public Set<Seance> getSeances2D() {
        return seances2D;
    }

    public void setSeances2D(Set<Seance> seances2D) {
        this.seances2D = seances2D;
    }
}
