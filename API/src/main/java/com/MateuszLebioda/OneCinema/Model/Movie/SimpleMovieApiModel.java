package com.MateuszLebioda.OneCinema.Model.Movie;

import com.MateuszLebioda.OneCinema.entity.Film;

public class SimpleMovieApiModel {
    private String title;
    private String id;

    public SimpleMovieApiModel(Film film){
        setTitle(film.getTitle());
        setId(film.getId());
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
