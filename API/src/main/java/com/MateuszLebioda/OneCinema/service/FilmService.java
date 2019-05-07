package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.Model.Movie.MovieApiModel;
import com.MateuszLebioda.OneCinema.entity.Film;
import com.MateuszLebioda.OneCinema.entity.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class FilmService {

    @Autowired
    FilmRepository filmRepository;

    public MovieApiModel getFilmDescriptionById(String id){
        Optional<Film> film =  filmRepository.findById(id);
        MovieApiModel movieApiModel;
        if(film.isPresent()){
            return new MovieApiModel(film.get());
        }else {
            return  null;
        }
    }

}
