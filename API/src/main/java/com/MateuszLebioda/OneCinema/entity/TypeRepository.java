package com.MateuszLebioda.OneCinema.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface TypeRepository extends JpaRepository<Type,String> {
    public List<Type> findAll();
    public Type findByName(String name);
    public Set<Type> findByNameIn(List<String> name);
}
