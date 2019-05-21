package com.MateuszLebioda.OneCinema.service.validator;

import com.MateuszLebioda.OneCinema.Model.Movie.MovieProcessingAddMovieFilmRequestMode;
import com.MateuszLebioda.OneCinema.Model.Sence.SeancesTime;
import com.MateuszLebioda.OneCinema.entity.Seance;
import com.MateuszLebioda.OneCinema.exception.CannotFindObjectException;
import com.MateuszLebioda.OneCinema.exception.WrongTimeException;
import com.MateuszLebioda.OneCinema.service.RoomService;
import com.MateuszLebioda.OneCinema.service.SeanceService;
import com.MateuszLebioda.OneCinema.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.MateuszLebioda.OneCinema.service.validator.ValidationErrors.THAT_ROOM_DOES_NOT_EXIST;

@Service
public class MovieProcessingValidator {

    @Autowired
    TypeService typeService;

    @Autowired
    RoomService roomService;

    @Autowired
    SeanceService seanceService;

    @Autowired
    ValidatorStatus validatorStatus;

    public void validateMovieProcessingAddMovie(MovieProcessingAddMovieFilmRequestMode addMovieModel){
          addMovieModel.validate();
                validateGender(addMovieModel.getGenders(),typeService.getTypeList());
                validateScreeningRooms(addMovieModel.getScreeningRoomsIdList(),roomService.getAllRoomsId());
                validateSeancesDate(addMovieModel.getDuration(),addMovieModel.getDateSeancesTime());
    }

    private void validateScreeningRooms(List<String> movieProcessingScreeningRooms, List<String> dataScreeningRooms){
        if(movieProcessingScreeningRooms != null){
            validateScreeningRoomsWithDatabase(movieProcessingScreeningRooms,dataScreeningRooms);
        }
    }

    private void validateScreeningRoomsWithDatabase(List<String> movieProcessingScreeningRooms, List<String> dataScreeningRooms){
        for (String screeningRoomsId : movieProcessingScreeningRooms) {
            if (!dataScreeningRooms.contains(screeningRoomsId))
                validatorStatus.addError(ValidationErrors.THAT_ROOM_DOES_NOT_EXIST);
        }
    }

    private void  validateSeancesDate(int durationFilmTime, Map<String,List<Date>> screeningRoomsSeancesDate){
        for (Map.Entry<String, List<Date>> entry : screeningRoomsSeancesDate.entrySet()) {
            try {
                int preparationTime = roomService.getPreparationTimeById(entry.getKey());
                int seanceTime = durationFilmTime + preparationTime;
                List<Date> dataSeancesList = getSeancesDateFromService(entry.getKey());
                List<SeancesTime> seancesTimes = prepareSeancesTimeList(seanceTime,entry.getValue());
                if(SeancesTime.checkIfOverlapInList(seancesTimes))
                    validatorStatus.addError(ValidationErrors.SEANCE_OVERLAP_IN_EXISTING_SEANCE);

                for(SeancesTime seance:seancesTimes){
                    if(SeancesTime.checkIfOverlapInList(seance,prepareSeancesTimeList(seanceTime,dataSeancesList)))
                        validatorStatus.addError(ValidationErrors.SEANCE_OVERLAP_IN_EXISTING_SEANCE);
                }
            } catch (CannotFindObjectException | WrongTimeException e) {
                validatorStatus.addError(ValidationErrors.SEANCE_DATE_ERROR);
            }
        }
    }

    private List<Date> getSeancesDateFromService(String id){
        Set<Seance> seanceSet = seanceService.getFutureSeancesByRoomId(id);
        List<Date> seancesDateList = new ArrayList<>();
        for(Seance seance:seanceSet){
            seancesDateList.add(seance.getStart());
        }
        return seancesDateList;
    }

    private List<SeancesTime> prepareSeancesTimeList(int durationFilm, List<Date> addMovieSeancesDates) throws WrongTimeException {

        List<SeancesTime> seancesTimes = new ArrayList<>();
        for(Date date:addMovieSeancesDates){
            seancesTimes.add(new SeancesTime(date,new Date(date.getTime() + durationFilm*1000*60)));
        }
        return seancesTimes;
    }


    private void validateGender(List<String> movieProcessingGenders,List<String> dataGenders){
        if(movieProcessingGenders != null &&
            dataGenders != null
            && movieProcessingGenders.size()>0){
                for(String movieGender:movieProcessingGenders){
                    if(!dataGenders.contains(movieGender))
                        validatorStatus.addError(ValidationErrors.GENDER_IS_NOT_IN_DATABASE);
                }
        }
        if(dataGenders == null){
            validatorStatus.addError(ValidationErrors.GENDER_IS_NOT_CHOSEN);
        }
    }


}
