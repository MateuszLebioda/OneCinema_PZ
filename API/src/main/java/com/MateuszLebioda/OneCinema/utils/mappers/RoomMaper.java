package com.MateuszLebioda.OneCinema.utils.mappers;

import com.MateuszLebioda.OneCinema.Model.ScreeningRoom.ScreeningRoomApiModel;
import com.MateuszLebioda.OneCinema.entity.Room;
import org.springframework.stereotype.Service;

@Service
public class RoomMaper {

    /*public Room mapScreeningRoomApiModel(ScreeningRoomApiModel screeningRoomApiModel){
        return null;
    }*/

    public ScreeningRoomApiModel maptoScreeningRoomApiModel(Room room){
        ScreeningRoomApiModel screeningRoomApiModel = new ScreeningRoomApiModel();

        screeningRoomApiModel.setId(room.getId());
        screeningRoomApiModel.setBreakBeforeAndAfterMovie(room.getPreparationTime());
        screeningRoomApiModel.setName(room.getName());

        return screeningRoomApiModel;
    }

}
