package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.Model.ScreeningRoom.ScreeningRoomApiModel;
import com.MateuszLebioda.OneCinema.entity.Room;
import com.MateuszLebioda.OneCinema.entity.RoomRepository;
import com.MateuszLebioda.OneCinema.exception.CannotFindObjectException;
import com.MateuszLebioda.OneCinema.utils.mappers.RoomMaper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    RoomMaper roomMaper;

    public List<String> getAllRoomsId(){
        List<Room> rooms = roomRepository.findAll();
        List<String> roomId = new ArrayList<>();
        for(Room seance:rooms){
            roomId.add(seance.getId());
        }
        return roomId;
    }

    public int getPreparationTimeById(String id) throws CannotFindObjectException {
        Optional<Room> room = roomRepository.findById(id);
        if(room.isPresent()){
            return  room.get().getPreparationTime();
        }
        throw new CannotFindObjectException();
    }

    public Room getRoomById(String id) throws CannotFindObjectException {
        Optional<Room> room = roomRepository.findById(id);
        if(room.isPresent()){
            return  room.get();
        }
        throw new CannotFindObjectException();
    }

    public List<ScreeningRoomApiModel> getAllRooms(){
        List<ScreeningRoomApiModel> screeningRoomApiModels = new ArrayList<>();

        for(Room room:roomRepository.findAll()){
            screeningRoomApiModels.add(roomMaper.maptoScreeningRoomApiModel(room));
        }

        return screeningRoomApiModels;
    }

}
