package com.MateuszLebioda.OneCinema.Model.Book;

public class BookedSeatApiModel {

    private String id;
    private boolean reducedPrice;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isReducedPrice() {
        return reducedPrice;
    }

    public void setReducedPrice(boolean reducedPrice) {
        this.reducedPrice = reducedPrice;
    }
}
