package com.MateuszLebioda.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "kino")
public class Cinema {

  @Id
  @Column(name = "id")
  @GeneratedValue(generator = "UUID")
  @GenericGenerator(
          name = "UUID",
          strategy = "org.hibernate.id.UUIDGenerator"
  )
  private String id;

  @Column (name = "miasto")
  private String city;

  @Column (name = "ulica")
  private String street;

  @Column (name = "nr")
  private String number;

  @Column (name = "telefon")
  private String phone;

  @Column (name = "e_mail")
  private String eMail;

  @JsonIgnore
  @OneToMany(mappedBy = "cinema")
  private Set<Room> rooms;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getStreet() {
    return street;
  }

  public void setStreet(String street) {
    this.street = street;
  }

  public String getNumber() {
    return number;
  }

  public void setNumber(String number) {
    this.number = number;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String geteMail() {
    return eMail;
  }

  public void seteMail(String eMail) {
    this.eMail = eMail;
  }
}
