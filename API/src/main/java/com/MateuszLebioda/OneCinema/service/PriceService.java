package com.MateuszLebioda.OneCinema.service;

import com.MateuszLebioda.OneCinema.Model.Price.PriceApiModel;
import com.MateuszLebioda.OneCinema.Model.Price.PriceListApiModel;
import com.MateuszLebioda.OneCinema.Model.Sence.Dimension;
import com.MateuszLebioda.OneCinema.entity.Price;
import com.MateuszLebioda.OneCinema.entity.PriceRepository;
import com.MateuszLebioda.OneCinema.exception.CannotFindObjectException;
import com.MateuszLebioda.OneCinema.utils.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class PriceService implements Serializable {
    @Autowired
    PriceRepository priceRepository;

    public PriceListApiModel getPriceList(){
        PriceListApiModel priceListApiModel = new PriceListApiModel();
        priceListApiModel.setPrice2D(new PriceApiModel(priceRepository.findAllBySeance("2D")));
        priceListApiModel.setPrice3D(new PriceApiModel(priceRepository.findAllBySeance("3D")));
        return  priceListApiModel;
    }

    public Status changePrice(PriceListApiModel priceListApiModel) {
        try {
            Set<Price> prices = getPriceByPriceApiModel(priceListApiModel);
            priceRepository.saveAll(prices);
            return Status.OK;
        } catch (CannotFindObjectException e) {
            return Status.WRONG;
        }
    }

    Set<Price> getPriceByPriceApiModel(PriceListApiModel priceListApiModel) throws CannotFindObjectException {
        Set<Price> prices = new HashSet<>();

        Price price = getPrice(PriceApiModel.NORMAL,Dimension._2D);
        price.setFridaySunday(priceListApiModel.getPrice2D().getNormal().getFridaySunday());
        price.setMondayThursday(priceListApiModel.getPrice2D().getNormal().getMondayThursday());
        prices.add(price);

        price = getPrice(PriceApiModel.NORMAL,Dimension._3D);
        price.setFridaySunday(priceListApiModel.getPrice3D().getNormal().getFridaySunday());
        price.setMondayThursday(priceListApiModel.getPrice3D().getNormal().getMondayThursday());
        prices.add(price);

        price = getPrice(PriceApiModel.REDUCED,Dimension._2D);
        price.setFridaySunday(priceListApiModel.getPrice2D().getReduced().getFridaySunday());
        price.setMondayThursday(priceListApiModel.getPrice2D().getReduced().getMondayThursday());
        prices.add(price);

        price = getPrice(PriceApiModel.REDUCED,Dimension._3D);
        price.setFridaySunday(priceListApiModel.getPrice3D().getReduced().getFridaySunday());
        price.setMondayThursday(priceListApiModel.getPrice3D().getReduced().getMondayThursday());
        prices.add(price);


        return prices;
    }

    private Price getPrice(String type, Dimension dimension) throws CannotFindObjectException {
        Optional<Price> price = priceRepository.findByTypeAndSeance(type, dimension.getValue());
        if(price.isPresent()){
            return price.get();
        }
        throw new CannotFindObjectException();
    }




}
