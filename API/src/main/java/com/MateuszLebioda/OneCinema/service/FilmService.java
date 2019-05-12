package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.Model.Movie.MovieApiModel;
import com.MateuszLebioda.OneCinema.Model.Movie.MovieProcessingRequestModel;
import com.MateuszLebioda.OneCinema.Model.Movie.SimpleMovieApiModel;
import com.MateuszLebioda.OneCinema.Model.Sence.Dimension;
import com.MateuszLebioda.OneCinema.entity.Film;
import com.MateuszLebioda.OneCinema.entity.FilmRepository;
import com.MateuszLebioda.OneCinema.entity.Type;
import com.MateuszLebioda.OneCinema.entity.TypeRepository;
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
    TypeRepository typeRepository;

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
        List<String> genders = new ArrayList<>();
        List<Type> types = typeRepository.findAll();
        for(Type type:types){
            genders.add(type.getName());
        }
        return  movieProcessingRequestModel.validate(genders);
    }
}
