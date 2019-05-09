package com.MateuszLebioda.OneCinema.service.PriceService;

import com.MateuszLebioda.OneCinema.Model.Price.PriceApiModel;
import com.MateuszLebioda.OneCinema.Model.Price.PriceListApiModel;
import com.MateuszLebioda.OneCinema.entity.PriceController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;

@Service
public class PriceService implements Serializable {
    @Autowired
    PriceController priceController;

    public PriceListApiModel getPriceList(){
        PriceListApiModel priceListApiModel = new PriceListApiModel();
        priceListApiModel.setPrice2D(new PriceApiModel(priceController.findAllBySeance("2D")));
        priceListApiModel.setPrice3D(new PriceApiModel(priceController.findAllBySeance("3D")));
        return  priceListApiModel;
    }


}
