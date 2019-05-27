package com.MateuszLebioda.OneCinema.utils.mappers;

import com.MateuszLebioda.OneCinema.Model.ScreeningRoom.ScreeningRoomApiModel;
import com.MateuszLebioda.OneCinema.Model.roomPlan.ScreeningRoomPlanApiModel;
import com.MateuszLebioda.OneCinema.Model.roomPlan.ScreeningRoomPlanRowApiModel;
import com.MateuszLebioda.OneCinema.Model.roomPlan.ScreeningRoomPlanSeatApiModel;
import com.MateuszLebioda.OneCinema.entity.Room;
import com.MateuszLebioda.OneCinema.entity.Spot;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class RoomMapper {

    /*public Room mapScreeningRoomApiModel(ScreeningRoomApiModel screeningRoomApiModel){
        return null;
    }*/

    public ScreeningRoomApiModel mapToScreeningRoomApiModel(Room room){
        ScreeningRoomApiModel screeningRoomApiModel = new ScreeningRoomApiModel();

        screeningRoomApiModel.setId(room.getId());
        screeningRoomApiModel.setBreakBeforeAndAfterMovie(room.getPreparationTime());
        screeningRoomApiModel.setName(room.getName());

        return screeningRoomApiModel;
    }

    public ScreeningRoomPlanApiModel mapToScreeningRoomPlanApiModel(Room room){
        Set<Spot> spots = room.getSpots();

        int maxRow = getMaxRow(spots);
        int maxSeat = getMaxSeat(spots);

        Spot[][] spotsTable = createTable(spots,maxRow,maxSeat);
        ScreeningRoomPlanApiModel screeningRoomPlanApiModel = createScreeningRoomPlanApiModel(spotsTable,maxRow,maxSeat);
        screeningRoomPlanApiModel.setId(room.getId());
        screeningRoomPlanApiModel.setScreeningRoomName(room.getName());

        return screeningRoomPlanApiModel;
    }

    private int getMaxRow(Set<Spot> spots){
        int maxRow = 0;
        for(Spot spot:spots){
            if(spot.getRaw() > maxRow)
                maxRow = spot.getRaw();
        }
        return maxRow +1;
    }

    private int getMaxSeat(Set<Spot> spots){
        int maxSeat = 0;
        for(Spot spot:spots){
            if(spot.getPosition() > maxSeat)
                maxSeat = spot.getRaw();
        }
        return maxSeat +1;
    }

    private Spot[][] createTable(Set<Spot> spots,int maxRow,int maxSeat){
        Spot[][]spotArray = new Spot[maxRow][maxSeat];

        for(Spot spot:spots){
            spotArray[spot.getRaw()][spot.getPosition()] = spot;
        }
        return spotArray;
    }

    private ScreeningRoomPlanApiModel createScreeningRoomPlanApiModel(Spot[][] spotsTable,int maxRow,int maxSeat){
        ScreeningRoomPlanApiModel plan = new ScreeningRoomPlanApiModel();
        List<ScreeningRoomPlanRowApiModel> rowApiModelList = new ArrayList<>();
        for(int row=0;row<maxRow;row++){
            ScreeningRoomPlanRowApiModel rows = new ScreeningRoomPlanRowApiModel();
            rows.setRow(row);
            List<ScreeningRoomPlanSeatApiModel> seatApiModelList = new ArrayList<>();
            for (int seat=0;seat<maxSeat;seat++){
                ScreeningRoomPlanSeatApiModel seats = new ScreeningRoomPlanSeatApiModel();
                seats.setId(spotsTable[row][seat].getId());
                seats.setSeat(spotsTable[row][seat].isPlace());
                seats.setPlaced(spotsTable[row][seat].getPosition());
                seatApiModelList.add(seats);
            }
            rows.setSeats(seatApiModelList);
            rowApiModelList.add(rows);
        }
        plan.setRows(rowApiModelList);
        return plan;
    }

}
