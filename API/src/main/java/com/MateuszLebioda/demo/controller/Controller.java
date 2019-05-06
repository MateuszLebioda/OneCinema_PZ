package com.MateuszLebioda.demo.controller;

import com.MateuszLebioda.demo.model.*;
import com.MateuszLebioda.demo.model.PriceController;
import com.MateuszLebioda.demo.service.Formatter;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping
@RestController
public class Controller {

    @Autowired
    FilmRepository filmRepository;

    @Autowired
    Formatter formatterImp;

    @Autowired
    TsTypeRepository typeRepository;


    @Autowired
    CinemaRepository cinemaRepository;

    @Autowired
    SeanceRepository seanceRepository;

    @Autowired
    SpotRepository spotRepository;

    @Autowired
    PriceController priceController;

//    @Autowired
//    ReservationRepository reservationRepository;

    Controller() {
    }

    @Autowired
    RoomRepository roomRepository;


    @RequestMapping(value = "/createNewSeance", method = RequestMethod.GET)
    @ResponseBody
    public String newSeance() throws JsonProcessingException {
        try {
            return formatterImp.returnJson(seanceRepository.findAll());
        } catch (JsonProcessingException e) {
            return formatterImp.returnJson(e);
        }
    }


    @RequestMapping(value = "/spot", method = RequestMethod.GET)
    @ResponseBody
    public String spot() throws JsonProcessingException {
        try {


            return formatterImp.returnJson(spotRepository.findAll());
        } catch (JsonProcessingException e) {
            return formatterImp.returnJson(e);
        }
    }


    @RequestMapping(value = "/add", method = RequestMethod.GET)
    @ResponseBody
    public String getTypes() throws JsonProcessingException {
        try {
            TsType type = new TsType();
            type.setName("Horror");
            typeRepository.save(type);
            return formatterImp.returnJson(typeRepository.findAll());
        } catch (JsonProcessingException e) {
            return formatterImp.returnJson(e);
        }
    }

    @RequestMapping(value = "/room", method = RequestMethod.GET)
    @ResponseBody
    public String room() throws JsonProcessingException {
        try {
            /*Room room = new Room();
            room.setName("1");
            room.setCinema(cinemaRepository.findAll().get(0));

            roomRepository.save(room);*/

            return formatterImp.returnJson(roomRepository.findAll());
        }catch (JsonProcessingException e) {
            return e.getMessage();
        }catch (NullPointerException e){
            return formatterImp.returnJson(e.getMessage());
        }
    }


    @RequestMapping(value = "/cennik", method = RequestMethod.GET)
    @ResponseBody
    public String cennik() {
        Price price = new Price();
        price.setType("Ulgowy");
        price.setMondayThursday(15);
        price.setMondayThursday(20);
        price.setSeance("2D");
        priceController.save(price);

        price = new Price();
        price.setType("Ulgowy");
        price.setMondayThursday(20);
        price.setMondayThursday(25);
        price.setSeance("3D");
        priceController.save(price);

        price = new Price();
        price.setType("Normalny");
        price.setMondayThursday(20);
        price.setMondayThursday(25);
        price.setSeance("2D");
        priceController.save(price);


        price = new Price();
        price.setType("Normalny");
        price.setMondayThursday(25);
        price.setMondayThursday(30);
        price.setSeance("3D");
        priceController.save(price);

        return new String("Succes");
    }

    @RequestMapping(value = "/cinema", method = RequestMethod.GET)
    @ResponseBody
    public String cinema() throws JsonProcessingException {
        try {
            return formatterImp.returnJson(cinemaRepository.findAll());
        }catch (JsonProcessingException e) {
            return e.getMessage();
        }catch (NullPointerException e){
            return formatterImp.returnJson(e.getMessage());
        }
    }

    @RequestMapping(value = "/seance", method = RequestMethod.GET)
    @ResponseBody
    public String seance() throws JsonProcessingException {
        try {
            /*Seance seance = new Seance();
            seance.setStart(new Date());
            seance.setIs3D(false);
            seanceRepository.save(seance);*/

            return formatterImp.returnJson(seanceRepository.findAll());
        }catch (JsonProcessingException e) {
            return e.getMessage();
        }catch (NullPointerException e){
            return formatterImp.returnJson(e.getMessage());
        }
    }


    /*@RequestMapping(value = "/films", method = RequestMethod.GET)
    @ResponseBody
    public String getFoosBySimplePath() throws JsonProcessingException {
        try {
            Film film = filmRepository.findAll().get(0);
            film.addTrailer(new Trailer("Zzazaz"));
            film.addTrailer(new Trailer("zaadascadscda"));
            filmRepository.save(film);
            return formatterImp.returnJson(filmRepository.findAll());
        }catch (JsonProcessingException e) {
            return e.getMessage();
        }catch (NullPointerException e){
            return formatterImp.returnJson(e.getMessage());
        }
    }*/


}
