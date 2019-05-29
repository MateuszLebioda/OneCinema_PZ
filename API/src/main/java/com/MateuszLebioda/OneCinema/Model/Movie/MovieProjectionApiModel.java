package com.MateuszLebioda.OneCinema.Model.Movie;

import com.MateuszLebioda.OneCinema.Model.Sence.Dimension;
import com.MateuszLebioda.OneCinema.Model.Sence.SeanceApiModel;
import com.MateuszLebioda.OneCinema.Model.Sence.SeancesApiModelWithProjectionType;

import java.util.List;

public class MovieProjectionApiModel {
    private String movieId;
    private String movieTitle;
    private String moviePosterUrl;
    private Dimension projectionType;
    private int movieDuration;
    private double rating;
    private List<String> movieGenders;
    private List<SeanceApiModel> seances;



    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public String getMoviePosterUrl() {
        return moviePosterUrl;
    }

    public void setMoviePosterUrl(String moviePosterUrl) {
        this.moviePosterUrl = moviePosterUrl;
    }

    public int getMovieDuration() {
        return movieDuration;
    }

    public void setMovieDuration(int movieDuration) {
        this.movieDuration = movieDuration;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public List<String> getMovieGenders() {
        return movieGenders;
    }

    public void setMovieGenders(List<String> movieGenders) {
        this.movieGenders = movieGenders;
    }

    public void addToSeanceApiModelList(SeanceApiModel seancesApiModelWithProjectionType){
        seances.add(seancesApiModelWithProjectionType);
    }

    public Dimension getProjectionType() {
        return projectionType;
    }

    public void setProjectionType(Dimension projectionType) {
        this.projectionType = projectionType;
    }

    public List<SeanceApiModel> getSeances() {
        return seances;
    }

    public void setSeances(List<SeanceApiModel> seances) {
        this.seances = seances;
    }
}
