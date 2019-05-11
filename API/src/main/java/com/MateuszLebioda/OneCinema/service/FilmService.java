package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.Model.Movie.MovieApiModel;
import com.MateuszLebioda.OneCinema.Model.Movie.MovieProcessingRequestModel;
import com.MateuszLebioda.OneCinema.Model.Movie.SimpleMovieApiModel;
import com.MateuszLebioda.OneCinema.Model.Sence.Dimension;
import com.MateuszLebioda.OneCinema.entity.Film;
import com.MateuszLebioda.OneCinema.entity.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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

    public Set<SimpleMovieApiModel> getAllSimpleMovieApiModel(){
        List<Film> films = filmRepository.findAll();
        Set<SimpleMovieApiModel> simpleMovieApiModelSet = new HashSet<>();
        for(Film film:films){
            simpleMovieApiModelSet.add(new SimpleMovieApiModel(film));
        }
        return simpleMovieApiModelSet;
    }

    public boolean validateMovieProcessingRequestModel(MovieProcessingRequestModel movieProcessingRequestModel){
        return  movieProcessingRequestModel.validate();
    }
}
