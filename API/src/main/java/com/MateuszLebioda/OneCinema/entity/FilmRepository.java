package com.MateuszLebioda.OneCinema.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FilmRepository extends JpaRepository<Film,String> {
    List<Film> findAll();
    Optional<Film> findByTitle(String title);
    List<Film> findTop10ByOrderByAddDateDesc();

    @Query("select f from Film f join f.seances s where s.start > sysdate" )
    List<Film> findCurrentFilms();
}
