package com.MateuszLebioda.OneCinema.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PriceController extends JpaRepository<Price,String> {
    List<Price> findAllByTypeAndSeance(String type, String seance);
    List<Price> findAllByType(String type);
    List<Price> findAllBySeance(String seance);
    List<Price> findAll();
}
