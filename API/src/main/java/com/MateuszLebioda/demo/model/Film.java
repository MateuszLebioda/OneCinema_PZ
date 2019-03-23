package com.MateuszLebioda.demo.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "film")
public class Film {

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

    public int getDuratation() {
        return duratation;
    }

    public void setDuratation(int duratation) {
        this.duratation = duratation;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

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

    /*@Column(name = "gatunek")

    */

    @Column(name = "premiera")
    Date premiere;

    @Column(name = "Czas_trwania")
    int duratation;

    @Column(name = "url")
    String url;

}
