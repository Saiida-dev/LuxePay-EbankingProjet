package org.example.ebankingbackendv2.service.implementations;

import com.vonage.client.VonageClient;
import com.vonage.client.sms.MessageStatus;
import com.vonage.client.sms.SmsSubmissionResponse;
import com.vonage.client.sms.messages.TextMessage;

import org.example.ebankingbackendv2.service.interfaces.SmsService;
import org.springframework.stereotype.Service;

@Service
public class VonageSmsService implements SmsService {

    private final VonageClient client;

    public VonageSmsService() {
        this.client = VonageClient.builder()
                .apiKey("e8a6626b") // Remplace par ta vraie clé
                .apiSecret("isGF11VZKgEOle12") // Remplace par ton vrai secret
                .build();
    }

    @Override
    public void sendSms(String to, String messageText) {
        TextMessage message = new TextMessage(
                "Vonage APIs", // Nom expéditeur (ou shortcode validé)
                to,
                messageText
        );

        try {
            SmsSubmissionResponse response = client.getSmsClient().submitMessage(message);

            if (response.getMessages().get(0).getStatus() == MessageStatus.OK) {
                System.out.println("✅ SMS envoyé à " + to);
            } else {
                System.out.println("❌ Erreur Vonage : " + response.getMessages().get(0).getErrorText());
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("🚨 Échec d'envoi du SMS avec Vonage.");
        }
    }

    @Override
    public void envoyerCodeVerification(String numero, String code) {
        String msg = "Votre code de vérification est : " + code;
        sendSms(numero, msg);
    }
}
