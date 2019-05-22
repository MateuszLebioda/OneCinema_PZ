package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.Model.Movie.MovieProcessingAddMovieFilmRequestMode;
import com.MateuszLebioda.OneCinema.Model.ScreeningRoom.MovieProcessingSeanceTimeRequestModel;
import com.MateuszLebioda.OneCinema.Model.ScreeningRoom.MovieProcessingSimplyScreeningRoomRequestModel;
import com.MateuszLebioda.OneCinema.Model.Sence.Dimension;
import com.MateuszLebioda.OneCinema.entity.Film;
import com.MateuszLebioda.OneCinema.entity.Room;
import com.MateuszLebioda.OneCinema.entity.Seance;
import com.MateuszLebioda.OneCinema.entity.SeanceRepository;
import com.MateuszLebioda.OneCinema.exception.CannotFindObjectException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
public class SeanceService {

    @Autowired
    SeanceRepository seanceRepository;

    @Autowired
    RoomService roomService;

    public Set<Seance> getCurrentSeances(Film film, Dimension dimension){
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH,7);
        Date end  = calendar.getTime();
        switch (dimension){
            case _2D:
                return  seanceRepository.findByFilmAndIs3DAndStartBetween(film,false,new Date(),end);
            case _3D:
                return seanceRepository.findByFilmAndIs3DAndStartBetween(film,true,new Date(),end);
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


}
