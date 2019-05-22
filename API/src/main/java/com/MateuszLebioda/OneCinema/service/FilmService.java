package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.Model.Movie.MovieApiModel;
import com.MateuszLebioda.OneCinema.Model.Movie.MovieProcessingAddMovieFilmRequestMode;
import com.MateuszLebioda.OneCinema.Model.Movie.SimpleMovieApiModel;
import com.MateuszLebioda.OneCinema.Model.Sence.Dimension;
import com.MateuszLebioda.OneCinema.entity.*;
import com.MateuszLebioda.OneCinema.exception.CannotFindObjectException;
import com.MateuszLebioda.OneCinema.service.validator.MovieProcessingValidator;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FilmService {

    @Autowired
    FilmRepository filmRepository;

    @Autowired
    SeanceService seanceService;

    @Autowired
    TypeService typeService;

    @Autowired
    RoomService roomService;

    @Autowired
    MovieProcessingValidator movieProcessingValidator;


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

    public void addFilmFromMovieProcessing(MovieProcessingAddMovieFilmRequestMode movieProcessingAddMovieFilmRequestMode) throws CannotFindObjectException {
       Film film = new Film();
       film.setTitle(movieProcessingAddMovieFilmRequestMode.getTitle());
       film.setDuration(movieProcessingAddMovieFilmRequestMode.getDuration());
       film.setGraphic(movieProcessingAddMovieFilmRequestMode.getPosterUrl());
       film.setTrailer(movieProcessingAddMovieFilmRequestMode.getTrailerUrl());
       film.setRating(movieProcessingAddMovieFilmRequestMode.getRating());

       film.setTypes(typeService.getTypesById(movieProcessingAddMovieFilmRequestMode.getGenders()));

       film.setSeances(seanceService.createSeancesFromMovieProcessing(film,movieProcessingAddMovieFilmRequestMode));

       filmRepository.save(film);
    }


    public Set<SimpleMovieApiModel> getAllSimpleMovieApiModel(){
        List<Film> films = filmRepository.findAll();
        Set<SimpleMovieApiModel> simpleMovieApiModelSet = new HashSet<>();
        for(Film film:films){
            simpleMovieApiModelSet.add(new SimpleMovieApiModel(film));
        }
        return simpleMovieApiModelSet;
    }

    public void validateMovieProcessingRequestModel(MovieProcessingAddMovieFilmRequestMode movieProcessingRequestModel){
            movieProcessingValidator.validateMovieProcessingAddMovie(movieProcessingRequestModel);
    }

    public Film getFilmByTitle(String name) throws CannotFindObjectException {
        Optional<Film> film = filmRepository.findByTitle(name);
        if(film.isPresent()){
            return film.get();
        }else {
            throw new CannotFindObjectException();
        }
    }

    public void checkIfFilmExist(String name) throws CannotFindObjectException {
        Optional<Film> film = filmRepository.findByTitle(name);
        if(film.isPresent()){
            throw new CannotFindObjectException();
        }
    }

}
