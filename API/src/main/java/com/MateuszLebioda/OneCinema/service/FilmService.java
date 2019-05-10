package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.Model.Movie.MovieApiModel;
import com.MateuszLebioda.OneCinema.Model.Sence.Dimension;
import com.MateuszLebioda.OneCinema.entity.Film;
import com.MateuszLebioda.OneCinema.entity.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class FilmService {

    @Autowired
    FilmRepository filmRepository;

    @Autowired
    SeanceService seanceService;

    public MovieApiModel getFilmDescriptionById(String id){
        Optional<Film> optionalFilm =  filmRepository.findById(id);
        if(optionalFilm.isPresent()){
            Film film = optionalFilm.get();
            film.setSeances2D(seanceService.getCurrentSeances(film, Dimension._2D));
            film.setSeances3D(seanceService.getCurrentSeances(film, Dimension._3D));
            return new MovieApiModel(film);
        }else {
            return  null;
        }
    }
    }
