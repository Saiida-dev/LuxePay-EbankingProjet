package org.example.ebankingbackendv2.service.interfaces;

import org.example.ebankingbackendv2.dto.ClientDTO;
import org.example.ebankingbackendv2.entity.Client;

import java.util.List;

public interface ClientService {
    List<Client> getAllClients();
    Client getClientById(Long id);
    Client createClient(Client client);
    Client updateClient(Long id, Client client);
    void deleteClient(Long id);
    ClientDTO getClientDTOById(Long id);

}
