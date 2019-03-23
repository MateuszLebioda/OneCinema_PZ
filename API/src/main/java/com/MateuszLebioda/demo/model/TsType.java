package com.MateuszLebioda.demo.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;


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
}


