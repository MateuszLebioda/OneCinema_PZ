package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.Model.Movie.MovieApiModel;
import com.MateuszLebioda.OneCinema.Model.Movie.MovieProcessingAddMovieFilmRequestMode;
import com.MateuszLebioda.OneCinema.Model.Movie.MovieShortInfoApiModel;
import com.MateuszLebioda.OneCinema.Model.Movie.SimpleMovieApiModel;
import com.MateuszLebioda.OneCinema.Model.Sence.Dimension;
import com.MateuszLebioda.OneCinema.entity.*;
import com.MateuszLebioda.OneCinema.exception.CannotFindObjectException;
import com.MateuszLebioda.OneCinema.utils.Status;
import com.MateuszLebioda.OneCinema.utils.validators.MovieProcessingValidator;
import com.MateuszLebioda.OneCinema.utils.mappers.MovieMapper;
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

    @Autowired
    MovieMapper movieMapper;


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
            Film film = movieMapper.mapMovieProcessingAddMovie(movieProcessingAddMovieFilmRequestMode);
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

    public void checkIfFilmExist(String title) throws CannotFindObjectException {
        Optional<Film> film = filmRepository.findByTitle(title);
        if(film.isPresent()){
            throw new CannotFindObjectException();
        }
    }

    public DeleteStatus deleteFilm(String id){
        DeleteStatus status = new DeleteStatus();

        Optional<Film> film = filmRepository.findById(id);
        if(film.isPresent() && film.get().getSeances().isEmpty()){
            filmRepository.delete(film.get());
            status.setStatus(Status.OK);
        }else {
            status.setStatus(Status.WRONG);
        }
        return status;
    }

    public List<MovieShortInfoApiModel> get8LatestFilms(){
        List<Film> films = filmRepository.findTop10ByOrderByAddDateDesc();
        List<MovieShortInfoApiModel> moves = new ArrayList<>();
        for(Film film:films){
            moves.add(movieMapper.mapToMovieShortInfoApiModel(film));
        }
        return  moves;
    }

    public List<Film> getActualList(){
        return filmRepository.findCurrentFilms();
    }

    public List<MovieShortInfoApiModel> get4RandomActualFilm(){
        final int COUNTER = 4;

        List<Film> films = getActualList();
        List<MovieShortInfoApiModel> moves = new ArrayList<>();

        if(films.size()>=COUNTER){
            List<Film> temporaryFilms = new ArrayList<>();
            Collections.shuffle(films);
            for(int i=0;i<COUNTER;i++){
                temporaryFilms.add(films.get(i));
            }
            films = temporaryFilms;
        }

        for(Film film:films){
            moves.add(movieMapper.mapToMovieShortInfoApiModel(film));
        }


        return  moves;
    }

}
