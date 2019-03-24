package com.MateuszLebioda.demo.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room,String> {
    List<Room> findAll();
}
