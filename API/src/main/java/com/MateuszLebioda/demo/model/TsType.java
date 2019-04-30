package com.MateuszLebioda.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table(name = "TS_Gatunek")
public class TsType {


    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
        name = "UUID",
        strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @Column(name = "nazwa")
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "types")
    private Set<Film> posts;

    public String getId() {
    return id;
    }

    public void setId(String id) {
    this.id = id;
    }

    public String getName() {
    return name;
    }

    public void setName(String name) {
    this.name = name;
    }

    public Set<Film> getPosts() {
        return posts;
    }

    public void setPosts(Set<Film> posts) {
        this.posts = posts;
    }
}


