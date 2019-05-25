package com.MateuszLebioda.OneCinema.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PriceRepository extends JpaRepository<Price,String> {
    Optional<Price> findByTypeAndSeance(String type, String seance);
    List<Price> findAllByType(String type);
    List<Price> findAllBySeance(String seance);
    List<Price> findAll();
}
