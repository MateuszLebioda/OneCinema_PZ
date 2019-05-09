package com.MateuszLebioda.OneCinema.Model.Price;

public class PriceListApiModel {
    private PriceApiModel price2D;
    private PriceApiModel price3D;

    public PriceApiModel getPrice2D() {
        return price2D;
    }

    public void setPrice2D(PriceApiModel price2D) {
        this.price2D = price2D;
    }

    public PriceApiModel getPrice3D() {
        return price3D;
    }

    public void setPrice3D(PriceApiModel price3D) {
        this.price3D = price3D;
    }
}
