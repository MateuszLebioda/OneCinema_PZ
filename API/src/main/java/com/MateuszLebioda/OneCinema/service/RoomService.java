package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.entity.Room;
import com.MateuszLebioda.OneCinema.entity.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService {

    @Autowired
    RoomRepository roomRepository;

    public List<String> getAllRoomsId(){
        List<Room> rooms = roomRepository.findAll();
        List<String> roomId = new ArrayList<>();
        for(Room seance:rooms){
            roomId.add(seance.getId());
        }
        return roomId;
    }

}
