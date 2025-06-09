package org.example.ebankingbackendv2.service.interfaces;


public interface SmsService {
    void sendSms(String to, String message);
    void envoyerCodeVerification(String numero, String code);
}

