package com.MateuszLebioda.OneCinema.Model.Price;


import com.MateuszLebioda.OneCinema.entity.Price;

import java.util.List;

public class PriceApiModel {

    public static final String NORMAL = "Normalny";
    public static final String REDUCED = "Ulgowy";

    private PricePerDayApiModel reduced;
    private PricePerDayApiModel normal;

    public PriceApiModel(){

    }

    public PriceApiModel(List<Price> priceList) {
        for (Price price : priceList) {
            switch (price.getType()) {
                case NORMAL: {
                    normal = new PricePerDayApiModel(price);
                    break;
                }case REDUCED:{
                    reduced = new PricePerDayApiModel(price);
                    break;
                }

            }
        }
    }



    public PricePerDayApiModel getNormal() {
        return normal;
    }

    public void setNormal(PricePerDayApiModel normal) {
        this.normal = normal;
    }

    public PricePerDayApiModel getReduced() {
        return reduced;
    }

    public void setReduced(PricePerDayApiModel reduced) {
        this.reduced = reduced;
    }


}
