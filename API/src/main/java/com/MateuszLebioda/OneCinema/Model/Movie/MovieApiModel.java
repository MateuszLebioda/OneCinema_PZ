package com.MateuszLebioda.OneCinema.Model.Movie;

import com.MateuszLebioda.OneCinema.entity.Film;
import com.MateuszLebioda.OneCinema.entity.Type;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class MovieApiModel {
    private String id;
    private String title;
    private String posterUrl;
    private String trailerUrl;
    private int duration;
    private List<String> genders;
    private int rating;

    //TODO: Seances

    public MovieApiModel(Film film){
        setId(film.getId());
        setTitle(film.getTitle());
        setPosterUrl(film.getGraphic());
        setTrailerUrl(film.getTrailer());
        setDuration(film.getDuration());
        setGendersByTypeSet(film.getTypes());
        setRating(film.getRating());
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getPosterUrl() {
        return posterUrl;
    }
    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public String getTrailerUrl() {
        return trailerUrl;
    }
    public void setTrailerUrl(String trailerUrl) {
        this.trailerUrl = trailerUrl;
    }

    public int getDuration() {
        return duration;
    }
    public void setDuration(int duration) {
        this.duration = duration;
    }
    public List<String> getGenders() {
        return genders;
    }

    public void setGenders(List<String> genders) {
        this.genders = genders;
    }
    public void setGendersByTypeSet(Set<Type> genders) {
        this.genders = new ArrayList<>();
        for(Type gender:genders){
            this.genders.add(gender.getName());
        }

    }

    public int getRating() {
        return rating;
    }
    public void setRating(int rating) {
        this.rating = rating;
    }
}
