package com.MateuszLebioda.demo.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpotSeanceRepository extends JpaRepository<SpotSeance,String> {
    List<SpotSeance>findAllBySeance(Seance seance);
}
