package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.Model.Movie.MovieProcessingAddMovieFilmRequestMode;
import com.MateuszLebioda.OneCinema.Model.Movie.MovieProjectionApiModel;
import com.MateuszLebioda.OneCinema.Model.ScreeningRoom.MovieProcessingSeanceTimeRequestModel;
import com.MateuszLebioda.OneCinema.Model.ScreeningRoom.MovieProcessingSimplyScreeningRoomRequestModel;
import com.MateuszLebioda.OneCinema.Model.Sence.Dimension;
import com.MateuszLebioda.OneCinema.Model.Sence.SeancesApiModelWithProjectionType;
import com.MateuszLebioda.OneCinema.entity.Film;
import com.MateuszLebioda.OneCinema.entity.Room;
import com.MateuszLebioda.OneCinema.entity.Seance;
import com.MateuszLebioda.OneCinema.entity.SeanceRepository;
import com.MateuszLebioda.OneCinema.exception.CannotFindObjectException;
import com.MateuszLebioda.OneCinema.exception.WrongTimeException;
import com.MateuszLebioda.OneCinema.utils.mappers.MovieMapper;
import com.MateuszLebioda.OneCinema.utils.mappers.SeanceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SeanceService {

    @Autowired
    SeanceRepository seanceRepository;

    @Autowired
    RoomService roomService;

    @Autowired
    MovieMapper movieMapper;
    @Autowired
    SeanceMapper seanceMapper;


    public Set<Seance> getCurrentSeances(Film film, Dimension dimension){
        Calendar calendar = Calendar.getInstance();

        calendar.setTime(new Date());
        calendar.set(Calendar.HOUR_OF_DAY,0);
        Date start  = calendar.getTime();

        calendar.add(Calendar.DAY_OF_MONTH,8);
        Date end  = calendar.getTime();

        switch (dimension){
            case _2D:
                return  seanceRepository.findByFilmAndIs3DAndStartBetween(film,false,start,end);
            case _3D:
                return seanceRepository.findByFilmAndIs3DAndStartBetween(film,true,start,end);
            default:
                return null;
        }
    }

    public Set<Seance> getFutureSeancesByRoomId(String id){
        return seanceRepository.findByRoomIdAndStartAfter(id,new Date());
    }

    public Set<Seance> createSeancesFromMovieProcessing(Film film,MovieProcessingAddMovieFilmRequestMode movieProcessingAddMovieFilmRequestMode) throws CannotFindObjectException {
        Set<Seance> seances = new HashSet<>();
        for(MovieProcessingSimplyScreeningRoomRequestModel screeningRoomRequestModel: movieProcessingAddMovieFilmRequestMode.getScreeningRooms()){
            Room room = roomService.getRoomById(screeningRoomRequestModel.getId());
            for(MovieProcessingSeanceTimeRequestModel seancesApiModel:screeningRoomRequestModel.getSeances()){
                Seance seance = new Seance();
                seance.setIs3D(seancesApiModel.getProjectionType() == Dimension._3D);
                seance.setStart(seancesApiModel.getStart());
                seance.setRoom(room);
                seances.add(seance);
                seance.setFilm(film);
            }
        }
        return seances;
    }


    public List<MovieProjectionApiModel> getMovieProjectionApiModelList(int dayNumber) throws WrongTimeException {
        if(dayNumber > 7) throw new WrongTimeException();

        List<MovieProjectionApiModel> movieProjectionApiModel = new ArrayList<>();
        Date start = prepareDate(dayNumber,0);
        Date end = prepareDate(dayNumber,24);
        Set<Seance> seances = seanceRepository.findByStartBetween(start,end);
        Set<Film> films = prepareFilmSetFromSeancesSet(seances);

        for(Film film: films){
            movieProjectionApiModel.addAll(movieMapper.mapToListMovieProjectionApiModel(film,seances));
        }
        
        for(Seance seance: seances){
            for(MovieProjectionApiModel movie: movieProjectionApiModel) {
                if (seance.getFilm().getTitle().equals(movie.getMovieTitle()) &&
                        (seance.isIs3D()?Dimension._3D:Dimension._2D) == movie.getProjectionType())
                    movie.addToSeanceApiModelList(seanceMapper.mapToSeancesApiModelWithProjectionType(seance));
            }
        }

        return movieProjectionApiModel;
    }

    private Date prepareDate(int dayNumber, int hour){

        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY,hour);
        calendar.set(Calendar.MINUTE,0);
        calendar.set(Calendar.SECOND,0);
        calendar.set(Calendar.MILLISECOND,0);
        calendar.set(Calendar.DAY_OF_MONTH,calendar.get(Calendar.DAY_OF_MONTH) + dayNumber);
        return calendar.getTime();
    }

    private Set<Film> prepareFilmSetFromSeancesSet(Set<Seance> seances){
        Set<Film> films = new HashSet<>();

        for(Seance seance:seances){
            films.add(seance.getFilm());
        }

        return films;
    }

}
