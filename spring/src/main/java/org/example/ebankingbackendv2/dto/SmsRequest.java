package org.example.ebankingbackendv2.dto;

public class SmsRequest {
    private String numero;
    private String message;

    // Getters et setters
    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}