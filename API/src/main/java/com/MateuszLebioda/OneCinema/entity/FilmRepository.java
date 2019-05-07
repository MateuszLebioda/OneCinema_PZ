package com.MateuszLebioda.OneCinema.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FilmRepository extends JpaRepository<Film,String> {
    Film findDistinctByTitle(String title);
    List<Film> findAll();
}
