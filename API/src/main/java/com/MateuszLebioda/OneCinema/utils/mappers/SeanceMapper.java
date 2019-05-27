package com.MateuszLebioda.OneCinema.utils.mappers;


import com.MateuszLebioda.OneCinema.Model.Sence.*;
import com.MateuszLebioda.OneCinema.entity.Seance;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;

@Service
public class SeanceMapper {

    public SeanceApiModelFull mapToSeanceApiModelFull(Seance seance){
        SeanceApiModelFull seanceApiModelFull = new SeanceApiModelFull();
        seanceApiModelFull.setSeanceId(seance.getId());
        seanceApiModelFull.setTitle(seance.getFilm().getTitle());
        seanceApiModelFull.setProjectionType(seance.isIs3D()? Dimension._3D:Dimension._2D);
        seanceApiModelFull.setStart(seance.getStart());
        seanceApiModelFull.setFinish(getEndTime(seance));
        return seanceApiModelFull;
    }

    public SeanceAndRoomApiModel mapToSeanceAndRoomApiModel(Seance seance){
        SeanceAndRoomApiModel seanceAndRoomApiModel = new SeanceAndRoomApiModel();
        seanceAndRoomApiModel.setSeanceId(seance.getId());
        seanceAndRoomApiModel.setDate(seance.getStart());
        seanceAndRoomApiModel.setMovieTitle(seance.getFilm().getTitle());
        seanceAndRoomApiModel.setProjectionType(seance.isIs3D()? Dimension._3D:Dimension._2D);
        seanceAndRoomApiModel.setScreeningRoomName(seance.getRoom().getName());
        seanceAndRoomApiModel.setScreeningRoomId(seance.getRoom().getId());
        return seanceAndRoomApiModel;
    }

    public SeancesApiModelWithProjectionType mapToSeancesApiModelWithProjectionType(Seance seance){
        SeancesApiModelWithProjectionType seanceApiModel = new SeancesApiModelWithProjectionType();

        seanceApiModel.setId(seance.getId());
        seanceApiModel.setStart(seance.getStart());
        seanceApiModel.setFinish(getEndTime(seance));
        seanceApiModel.setProjectionType(seance.isIs3D()? Dimension._3D:Dimension._2D);

        return seanceApiModel;
    }

    private Date getEndTime(Seance seance){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(seance.getStart());
        calendar.add(Calendar.MINUTE,seance.getRoom().getPreparationTime()*2);
        calendar.add(Calendar.MINUTE,seance.getFilm().getDuration());
        return calendar.getTime();
    }
}
