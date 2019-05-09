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
    String title;

    @Column(name = "rezyser")
    String director;

    @OneToMany(mappedBy = "film")
    private Set<Seance> seances;

    @ManyToMany
    @JoinTable(
            name = "gatunek_film",
            joinColumns = @JoinColumn(name = "id_film"),
            inverseJoinColumns = @JoinColumn(name = "id_ts_gatunek"))
    Set<Type> types;

    @Column(name = "premiera")
    Date premiere;

    @Column(name = "Czas_trwania")
    int duration;

    @Column(name = "url_grafika")
    String graphic;

    @Column(name = "url_zwiastun")
    String trailer;

    @Column(name = "ocena")
    double rating;

    public Set<Seance> get3DSeances(){
        Set<Seance> seances;
        seances = this.seances.stream().filter(Seance::isIs3D).collect(Collectors.toSet());
        return seances;
    }

    public Set<Seance> get2DSeances(){
        Set<Seance> seances;
        seances = this.seances.stream().filter(s -> !s.isIs3D()).collect(Collectors.toSet());
        return seances;
    }

    public Set<Seance> get2DCurrentSeances(){
        Set<Seance> seances = new HashSet<>();
        Date currentDate = new Date();
        for(Seance seance:get2DSeances()){
            if(seance.getStart().compareTo(currentDate)>=0)
                seances.add(seance);
        }
        return seances;
    }

    public Set<Seance> get3DCurrentSeances(){
        Set<Seance> seances = new HashSet<>();
        Date currentDate = new Date();
        for(Seance seance:get3DSeances()){
            if(seance.getStart().compareTo(currentDate)>=0)
                seances.add(seance);
        }
        return seances;
    }

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
}
