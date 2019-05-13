package com.MateuszLebioda.OneCinema.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CinemaRepository extends JpaRepository<Cinema,String> {
    List<Cinema> findAll();
}
