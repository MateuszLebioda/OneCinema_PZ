package com.MateuszLebioda.OneCinema.controller;

import com.MateuszLebioda.OneCinema.Model.Movie.MovieProcessingAddMovieFilmRequestMode;
import com.MateuszLebioda.OneCinema.exception.CannotFindObjectException;
import com.MateuszLebioda.OneCinema.service.FilmService;
import com.MateuszLebioda.OneCinema.utils.formatters.Formatter;
import com.MateuszLebioda.OneCinema.utils.validators.ValidationErrors;
import com.MateuszLebioda.OneCinema.utils.validators.ValidatorStatus;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.wordnik.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;

@RequestMapping("/films")
@RestController
public class FilmController {

    @Autowired
    FilmService filmService;

    @Autowired
    Formatter formatter;

    @Autowired
    ValidatorStatus validatorStatus;

    @ApiOperation(value = "Return description of film")
    @RequestMapping(value = "/description/{id}", method = RequestMethod.GET)
    @ResponseBody
    public String spot(@PathVariable String id) throws JsonProcessingException {
        return  formatter.returnJson(filmService.getFilmDescriptionById(id));
    }

    @ApiOperation(value = "Delete film by id")
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public String deleteFilm(@PathVariable String id) throws JsonProcessingException {
        return  formatter.returnJson(filmService.deleteFilm(id));
    }


    @ApiOperation(value = "Return simple set of film")
    @RequestMapping(value = "/simpleMovieList", method = RequestMethod.GET)
    @ResponseBody
    public String getSimpleFilms() throws JsonProcessingException {
        return  formatter.returnJson(filmService.getAllSimpleMovieApiModel());
    }

    @ApiOperation(value = "Add film")
    @RequestMapping(value = "/addFilm", method = RequestMethod.POST)
    @ResponseBody
    public ValidatorStatus addFilm(@RequestBody MovieProcessingAddMovieFilmRequestMode movieProcessingRequestModel) throws URISyntaxException {
        validatorStatus.clear();
        filmService.validateMovieProcessingRequestModel(movieProcessingRequestModel);
        if(validatorStatus.isCorrect()) {
            try {
                filmService.addFilmFromMovieProcessing(movieProcessingRequestModel);
            } catch (CannotFindObjectException e) {
                validatorStatus.addError(ValidationErrors.CANNOT_ADD_FILM);
            }
        }
        return validatorStatus;
    }

    @ApiOperation(value = "preview about film")
    @RequestMapping(value = "preview/{id}", method = RequestMethod.GET)
    @ResponseBody
    public String previewFilm(@PathVariable String id){

        return null;
    }
}
