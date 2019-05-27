package com.MateuszLebioda.OneCinema.utils.validators;

public enum ValidationErrors {

    WRONG_LENGTH_OF_TITLE("Title is to short or to length"),
    TO_SHORT_DURATION("Film duration is to length"),
    WRONG_POSTER_URL("Wrong poster url"),
    WRONG_TRAILER_URL("Wrong poster url"),
    RATING_IS_NOT_IN_THE_RANGE("Ration is to small, or to high"),
    GENDER_IS_NOT_IN_DATABASE("This gender doesnt exist"),
    GENDER_IS_NOT_CHOSEN("You have to choose gender"),
    THAT_ROOM_DOES_NOT_EXIST("This room doesnt exist in database"),
    SEANCE_OVERLAP_IN_EXISTING_SEANCE("seance overlap on existing seance"),
    SEANCE_DATE_ERROR("Seance date error"),
    SEANCE_HAVE_TO_HAS_UNIQUE_ID("Seance have to has unique id"),
    WRONG_SEANCE_TIME("Wrong seance time"),
    FILM_WITH_THAT_TITLE_EXIST("Film with this title already exist"),
    CANNOT_ADD_FILM("Cannot add film");

    String message;
    ValidationErrors(String message){
        this.message = message;
    }

}
