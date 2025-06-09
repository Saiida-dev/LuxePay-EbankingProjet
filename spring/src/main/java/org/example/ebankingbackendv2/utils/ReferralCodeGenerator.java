package org.example.ebankingbackendv2.utils;

import java.util.UUID;

public class ReferralCodeGenerator {
    public static String generateReferralCode(String prefix) {
        String uuidPart = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return prefix.toUpperCase() + "-" + uuidPart;
    }
}