package com.MateuszLebioda.OneCinema.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation,String> {
    List<Reservation>findAllBySeance(Seance seance);

    @Query("select r from Reservation r join  r.seance s where s.id = :id")
    List<Reservation> findAllBySeanceId(String id);
}
