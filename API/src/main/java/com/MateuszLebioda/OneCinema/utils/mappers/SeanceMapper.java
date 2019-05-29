package com.MateuszLebioda.OneCinema.utils.mappers;


import com.MateuszLebioda.OneCinema.Model.Sence.*;
import com.MateuszLebioda.OneCinema.entity.Seance;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.*;

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

    public SeanceApiModel mapToSeancesApiModelWithProjectionType(Seance seance){
        SeanceApiModel seanceApiModel = new SeanceApiModel();

        seanceApiModel.setId(seance.getId());
        seanceApiModel.setStart(seance.getStart());
        seanceApiModel.setFinish(getEndTime(seance));

        return seanceApiModel;
    }

    private Date getEndTime(Seance seance){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(seance.getStart());
        calendar.add(Calendar.MINUTE,seance.getRoom().getPreparationTime()*2);
        calendar.add(Calendar.MINUTE,seance.getFilm().getDuration());
        return calendar.getTime();
    }

    public Set<DaySeancesApiModel> mapToSetDaySeancesApiModel(Set<Seance> seance){
        Set<DaySeancesApiModel> daySeancesApiModel = new HashSet<>();

        Map<Integer,Set<Seance>> seancesPerDay = getSeancesPerDayMap(seance);

        for (Map.Entry<Integer,Set<Seance>>  entry : seancesPerDay.entrySet()) {
            DaySeancesApiModel model = new DaySeancesApiModel();
            model.setDay(entry.getKey());
            List<SeanceApiModel> seanceApiModels = new ArrayList<>();
            for(Seance seanceToApiModel:entry.getValue()) {
                seanceApiModels.add(mapToSeanceApiModel(seanceToApiModel));
            }
            model.setSeances(seanceApiModels);
            daySeancesApiModel.add(model);
        }
        return daySeancesApiModel;
    }

    private Map<Integer,Set<Seance>> getSeancesPerDayMap(Set<Seance> seance){
        Map<Integer,Set<Seance>> seancesPerDay = new HashMap<>();
        for(Seance daySeances:seance){
            Date d = daySeances.getStart();
            Calendar todayDate = Calendar.getInstance();
            todayDate.set(Calendar.HOUR_OF_DAY,0);

            Calendar seanceDate = Calendar.getInstance();
            seanceDate.setTime(d);

            int days = (int)Duration.between(todayDate.toInstant(), seanceDate.toInstant()).toDays();
            if(days <=7) {
                if (seancesPerDay.get(days) == null) {
                    Set<Seance> s = new HashSet<>();
                    s.add(daySeances);
                    seancesPerDay.put(days, s);
                } else {
                    seancesPerDay.get(days).add(daySeances);
                }
            }
        }
        return seancesPerDay;
    }

    public SeanceApiModel mapToSeanceApiModel(Seance seance){
        SeanceApiModel seanceApiModel = new SeanceApiModel();

        seanceApiModel.setId(seance.getId());
        seanceApiModel.setStart(seance.getStart());
        seanceApiModel.setFinish(getEndTime(seance));

        return seanceApiModel;
    }


}
