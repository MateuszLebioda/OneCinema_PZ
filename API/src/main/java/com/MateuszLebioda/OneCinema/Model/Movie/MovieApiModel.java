package com.MateuszLebioda.OneCinema.Model.Movie;

import com.MateuszLebioda.OneCinema.Model.Sence.DaySeancesApiModel;
import com.MateuszLebioda.OneCinema.entity.Film;
import com.MateuszLebioda.OneCinema.entity.Seance;
import com.MateuszLebioda.OneCinema.entity.Type;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class MovieApiModel {
    private String id;
    private String title;
    private String posterUrl;
    private String trailerUrl;
    private int duration;
    private List<String> genders;
    private double rating;
    private Set<DaySeancesApiModel> seances2D;
    private Set<DaySeancesApiModel> seances3D;

    public void setGendersByTypeSet(Set<Type> genders) {
        this.genders = new ArrayList<>();
        for(Type gender:genders){
            this.genders.add(gender.getName());
        }
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

    public double getRating() {
        return rating;
    }
    public void setRating(double rating) {
        this.rating = rating;
    }

    public Set<DaySeancesApiModel> getSeances2D() {
        return seances2D;
    }

    public void setSeances2D(Set<DaySeancesApiModel> seances2D) {
        this.seances2D = seances2D;
    }

    public Set<DaySeancesApiModel> getSeances3D() {
        return seances3D;
    }

    public void setSeances3D(Set<DaySeancesApiModel> seances3D) {
        this.seances3D = seances3D;
    }
}
