package com.MateuszLebioda.OneCinema.service.impl;

import com.MateuszLebioda.OneCinema.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    public JavaMailSender emailSender;

    public void sendEmail(String to){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("Rezerwacja");
        message.setTo(to);
        message.setText("Zarezerwowano miejsca!");
        emailSender.send(message);

    }
}
