package com.MateuszLebioda.OneCinema.utils.mappers;

import com.MateuszLebioda.OneCinema.Model.Movie.MovieProcessingAddMovieFilmRequestMode;
import com.MateuszLebioda.OneCinema.Model.Movie.MovieShortInfoApiModel;
import com.MateuszLebioda.OneCinema.entity.Film;
import com.MateuszLebioda.OneCinema.exception.CannotFindObjectException;
import com.MateuszLebioda.OneCinema.service.FilmService;
import com.MateuszLebioda.OneCinema.service.SeanceService;
import com.MateuszLebioda.OneCinema.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieMapper {

    @Autowired
    TypeService typeService;

    @Autowired
    SeanceService seanceService;

    public Film mapMovieProcessingAddMovie(MovieProcessingAddMovieFilmRequestMode  movieProcessingAddMovieFilmRequestMode) throws CannotFindObjectException {
        Film film = new Film();
        film.setTitle(movieProcessingAddMovieFilmRequestMode.getTitle());
        film.setDuration(movieProcessingAddMovieFilmRequestMode.getDuration());
        film.setGraphic(movieProcessingAddMovieFilmRequestMode.getPosterUrl());
        film.setTrailer(movieProcessingAddMovieFilmRequestMode.getTrailerUrl());
        film.setRating(movieProcessingAddMovieFilmRequestMode.getRating());
        film.setTypes(typeService.getTypesById(movieProcessingAddMovieFilmRequestMode.getGenders()));
        if(movieProcessingAddMovieFilmRequestMode.getScreeningRooms()!= null)
            film.setSeances(seanceService.createSeancesFromMovieProcessing(film,movieProcessingAddMovieFilmRequestMode));
        return film;
    }

    public MovieShortInfoApiModel mapToMovieShortInfoApiModel(Film  film) {
        MovieShortInfoApiModel movieShortInfoApiModel = new MovieShortInfoApiModel();

        movieShortInfoApiModel.setId(film.getId());
        movieShortInfoApiModel.setTitle(film.getTitle());
        movieShortInfoApiModel.setPosterUrl(film.getGraphic());
        movieShortInfoApiModel.setTrailerUrl(film.getTrailer());
        movieShortInfoApiModel.setRating(film.getRating());

        return movieShortInfoApiModel;
    }
}
