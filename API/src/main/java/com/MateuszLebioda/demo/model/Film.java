package com.MateuszLebioda.demo.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;


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

    @ManyToMany
    @JoinTable(
            name = "gatunek_film",
            joinColumns = @JoinColumn(name = "id_film"),
            inverseJoinColumns = @JoinColumn(name = "id_ts_gatunek"))
    Set<TsType> types;

    @Column(name = "premiera")
    Date premiere;

    @Column(name = "Czas_trwania")
    int duration;

    @Column(name = "url")
    String url;

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

    public void setDuration(int duratation) {
        this.duration = duratation;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Set<TsType> getTypes() {
        return types;
    }

    public void setTypes(Set<TsType> type) {
        this.types = type;
    }

    public void addType(TsType type){
        this.types.add(type);
    }

    public void addTypes(List<TsType> type){
        this.types.addAll(type);
    }



}
