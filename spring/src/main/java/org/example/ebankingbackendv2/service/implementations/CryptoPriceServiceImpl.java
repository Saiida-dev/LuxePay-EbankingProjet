package org.example.ebankingbackendv2.service.implementations;

import org.example.ebankingbackendv2.service.interfaces.CryptoPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class CryptoPriceServiceImpl implements CryptoPriceService {

    private final RestTemplate restTemplate;

    @Autowired
    public CryptoPriceServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public double getCurrentBitcoinPriceUSD() {
        String url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
        Map response = restTemplate.getForObject(url, Map.class);
        return ((Number)((Map)response.get("bitcoin")).get("usd")).doubleValue();
    }
}
