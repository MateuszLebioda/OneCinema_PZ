package com.MateuszLebioda.OneCinema.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Set;

public interface SeanceRepository extends JpaRepository<Seance,String> {
    List<Seance> findAll();
    Set<Seance> findByFilmAndIs3DAndStartBetween(Film film,boolean is3D, Date startDate, Date endDate);
    Set<Seance> findByRoomIdAndStartAfter(String roomId,Date start);
    Set<Seance> findByRoomIdAndStartBetween(String roomId,Date start,Date finish);
    Set<Seance> findByStartBetween(Date startDate, Date endDate);
}
