package com.MateuszLebioda.OneCinema.utils.mappers;

import com.MateuszLebioda.OneCinema.Model.Movie.*;
import com.MateuszLebioda.OneCinema.Model.Sence.DaySeancesApiModel;
import com.MateuszLebioda.OneCinema.Model.Sence.Dimension;
import com.MateuszLebioda.OneCinema.entity.Film;
import com.MateuszLebioda.OneCinema.entity.Seance;
import com.MateuszLebioda.OneCinema.exception.CannotFindObjectException;
import com.MateuszLebioda.OneCinema.service.SeanceService;
import com.MateuszLebioda.OneCinema.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class MovieMapper {

    @Autowired
    TypeService typeService;

    @Autowired
    SeanceService seanceService;

    @Autowired
    SeanceMapper seanceMapper;

    @Autowired
    RoomMapper roomMapper;

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

    public MovieProjectionApiModel mapToMovieProjectionApiModel(Film film){
        MovieProjectionApiModel movieApiMode = new MovieProjectionApiModel();

        movieApiMode.setMovieId(film.getId());
        movieApiMode.setMovieTitle(film.getTitle());
        movieApiMode.setMovieDuration(film.getDuration());
        movieApiMode.setMoviePosterUrl(film.getGraphic());
        movieApiMode.setRating(film.getRating());
        movieApiMode.setMovieGenders(film.getGendersStringList());
        movieApiMode.setSeances(new ArrayList<>());

        return movieApiMode;
    }

    public List<MovieProjectionApiModel> mapToListMovieProjectionApiModel(Film film,Set<Seance> seances){
        List<MovieProjectionApiModel> movieList = new ArrayList<>();

        for(Dimension dimension:Dimension.values()){
            if(checkDimensio(film,seances,dimension)){
                MovieProjectionApiModel model = mapToMovieProjectionApiModel(film);
                model.setProjectionType(dimension);
                movieList.add(model);
            }
        }
        return movieList;
    }

    public boolean checkDimensio(Film film,Set<Seance> seances,Dimension dimension){
        for(Seance seance:seances){
            if(seance.getFilm().getTitle().equals(film.getTitle())
                    && dimension == (seance.isIs3D()?Dimension._3D:Dimension._2D)){
                    return true;
            }
        }
        return false;
    }

    public MovieApiModel mapToMovieApiModel(Film film){
        MovieApiModel movieApiModel = new MovieApiModel();

        movieApiModel.setId(film.getId());
        movieApiModel.setTitle(film.getTitle());
        movieApiModel.setPosterUrl(film.getGraphic());
        movieApiModel.setTrailerUrl(film.getTrailer());
        movieApiModel.setDuration(film.getDuration());
        movieApiModel.setGendersByTypeSet(film.getTypes());
        movieApiModel.setRating(film.getRating());

        Set<DaySeancesApiModel> seancesApiModel2D =  seanceMapper.mapToSetDaySeancesApiModel(film.getSeances2D());
        Set<DaySeancesApiModel> seancesApiModel3D =  seanceMapper.mapToSetDaySeancesApiModel(film.getSeances3D());

        movieApiModel.setSeances2D(seancesApiModel2D);
        movieApiModel.setSeances3D(seancesApiModel3D);

        return movieApiModel;
    }

}
