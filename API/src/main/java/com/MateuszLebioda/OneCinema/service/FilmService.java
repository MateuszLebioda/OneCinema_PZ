package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.Model.Movie.*;
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

    public MovieApiModel getFilmDescriptionById(String id) throws CannotFindObjectException {
        Optional<Film> optionalFilm = filmRepository.findById(id);
        if (optionalFilm.isPresent()) {
            Film film = optionalFilm.get();
            film.setSeances2D(seanceService.getCurrentSeances(film, Dimension._2D));
            film.setSeances3D(seanceService.getCurrentSeances(film, Dimension._3D));
            return movieMapper.mapToMovieApiModel(film);
        } else {
            throw new CannotFindObjectException();
        }
    }

    public void addFilmFromMovieProcessing(MovieProcessingAddMovieFilmRequestMode movieProcessingAddMovieFilmRequestMode) throws CannotFindObjectException {
        Film film = movieMapper.mapMovieProcessingAddMovie(movieProcessingAddMovieFilmRequestMode);
        filmRepository.save(film);

    }

    public Set<SimpleMovieApiModel> getAllSimpleMovieApiModel() {
        List<Film> films = filmRepository.findAll();
        Set<SimpleMovieApiModel> simpleMovieApiModelSet = new HashSet<>();
        for (Film film : films) {
            simpleMovieApiModelSet.add(new SimpleMovieApiModel(film));
        }
        return simpleMovieApiModelSet;
    }

    public void validateMovieProcessingRequestModel(MovieProcessingAddMovieFilmRequestMode movieProcessingRequestModel) {
        movieProcessingValidator.validateMovieProcessingAddMovie(movieProcessingRequestModel);
    }

    public Film getFilmByTitle(String name) throws CannotFindObjectException {
        Optional<Film> film = filmRepository.findByTitle(name);
        if (film.isPresent()) {
            return film.get();
        } else {
            throw new CannotFindObjectException();
        }
    }

    public void checkIfFilmExist(String title) throws CannotFindObjectException {
        Optional<Film> film = filmRepository.findByTitle(title);
        if (film.isPresent()) {
            throw new CannotFindObjectException();
        }
    }

    public DeleteStatus deleteFilm(String id) {
        DeleteStatus status = new DeleteStatus();

        Optional<Film> film = filmRepository.findById(id);
        if (film.isPresent() && film.get().getSeances().isEmpty()) {
            filmRepository.delete(film.get());
            status.setStatus(Status.OK);
        } else {
            status.setStatus(Status.WRONG);
        }
        return status;
    }

    public List<MovieShortInfoApiModel> get8LatestFilms() {
        List<Film> films = filmRepository.findTop10ByOrderByAddDateDesc();
        List<MovieShortInfoApiModel> moves = new ArrayList<>();
        for (Film film : films) {
            moves.add(movieMapper.mapToMovieShortInfoApiModel(film));
        }
        return moves;
    }

    public List<Film> getActualList() {
        return filmRepository.findCurrentFilms();
    }

    public List<MovieShortInfoApiModel> get4RandomActualFilm() {


        List<Film> films = getActualList();
        List<MovieShortInfoApiModel> moves = new ArrayList<>();
        final int FINISH = 4;
        int start = 0;
        List<Film> temporaryFilms = new ArrayList<>();

        for (Film film : films) {
            Collections.shuffle(films);
            if (!checkContains(temporaryFilms, film)) {
                temporaryFilms.add(film);
                start++;
                if (start == FINISH)
                    break;
            }
            films = temporaryFilms;
        }

        for (Film film : films) {
            moves.add(movieMapper.mapToMovieShortInfoApiModel(film));
        }
        return moves;
    }

    private boolean checkContains(List<Film> films, Film film) {
        for (Film f : films) {
            if (f.getTitle().equals(film.getTitle()))
                return true;
        }
        return false;
    }
}
