package com.MateuszLebioda.OneCinema.utils.mappers;


import com.MateuszLebioda.OneCinema.Model.Sence.Dimension;
import com.MateuszLebioda.OneCinema.Model.Sence.SeanceApiModelFull;
import com.MateuszLebioda.OneCinema.entity.Seance;
import org.springframework.stereotype.Service;

import java.util.Calendar;

@Service
public class SeanceMapper {

    public SeanceApiModelFull mapToSeanceApiModelFull(Seance seance){
        SeanceApiModelFull seanceApiModelFull = new SeanceApiModelFull();

        seanceApiModelFull.setSeanceId(seance.getId());
        seanceApiModelFull.setTitle(seance.getFilm().getTitle());
        seanceApiModelFull.setProjectionType(seance.isIs3D()? Dimension._3D:Dimension._2D);
        seanceApiModelFull.setStart(seance.getStart());

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(seance.getStart());
        calendar.add(Calendar.MINUTE,seance.getRoom().getPreparationTime()*2);
        calendar.add(Calendar.MINUTE,seance.getFilm().getDuration());

        seanceApiModelFull.setFinish(calendar.getTime());

        return seanceApiModelFull;
    }
}
