package com.MateuszLebioda.demo.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TsTypeRepository extends JpaRepository<TsType,String> {
    public List<TsType> findAll();
}
