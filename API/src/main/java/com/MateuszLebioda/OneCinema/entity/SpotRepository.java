package com.MateuszLebioda.OneCinema.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpotRepository extends JpaRepository<Spot,String> {
    List<Spot> findAll();
}
