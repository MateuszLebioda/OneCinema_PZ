package com.MateuszLebioda.OneCinema.utils.validators;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ValidatorStatus {

    private boolean correct;
    private List<ValidationErrors> errors;

    public ValidatorStatus(){
        errors = new ArrayList<>();
        correct = true;
    }

    public void clear(){
        errors = new ArrayList<>();
        correct = true;
    }

    public void addError(ValidationErrors error){
        errors.add(error);
        correct = false;
    }

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean correct) {
        this.correct = correct;
    }

    public List<ValidationErrors> getErrors() {
        return errors;
    }

    public void setErrors(List<ValidationErrors> errors) {
        this.errors = errors;
    }
}
