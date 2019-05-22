package com.MateuszLebioda.OneCinema.Model.Sence;
import com.MateuszLebioda.OneCinema.exception.WrongTimeException;

import java.util.Date;
import java.util.List;

public class SeancesTime {
    private Date start;
    private Date end;

    static public boolean checkIfOverlapInList(List<SeancesTime> seancesTimes){
       for (int i = 0; i < seancesTimes.size();i++){
           for(int j = 0;j< seancesTimes.size();j++){
                if(i!=j && seancesTimes.get(i).overlap(seancesTimes.get(j)))
                    return true;
           }
       }
       return false;
    }

    static public boolean checkIfOverlapInList(SeancesTime seanceTime,List<SeancesTime> seancesTime){
        for (SeancesTime seances:seancesTime){
            if (seanceTime.overlap(seances))
                return true;
        }
        return false;
    }

    public SeancesTime(Date start, Date end) throws WrongTimeException {
        this.start = start;
        this.end = end;
        if(start.getTime() >= end.getTime())
            throw new WrongTimeException();

        if(start.before(new Date()))
            throw  new WrongTimeException();
    }

    public boolean overlap(SeancesTime seancesTime){
        if(start.getTime() > seancesTime.getEnd().getTime() ||
                end.getTime() < seancesTime.getStart().getTime()
        )
            return false;
        return true;
    }


    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }
}
