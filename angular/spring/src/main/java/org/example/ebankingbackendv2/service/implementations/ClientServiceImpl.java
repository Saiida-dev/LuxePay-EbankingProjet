package org.example.ebankingbackendv2.service.implementations;

import org.example.ebankingbackendv2.dto.ClientDTO;
import org.example.ebankingbackendv2.entity.Client;
import org.example.ebankingbackendv2.repository.ClientRepository;
import org.example.ebankingbackendv2.service.interfaces.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @Override
    public Client getClientById(Long id) {
        return clientRepository.findById(id).orElse(null);
    }

    @Override
    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client updateClient(Long id, Client client) {
        Optional<Client> existing = clientRepository.findById(id);
        if (existing.isPresent()) {
            Client c = existing.get();
            c.setNom(client.getNom());
            c.setPrenom(client.getPrenom());
            c.setEmail(client.getEmail());
            c.setTelephone(client.getTelephone());
            return clientRepository.save(c);
        }
        return null;
    }

    @Override
    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }


    @Override
    public ClientDTO getClientDTOById(Long id) {
        Client client = clientRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Client non trouvé"));

        ClientDTO dto = new ClientDTO();
        dto.setId(client.getId());
        dto.setNom(client.getNom());
        dto.setPrenom(client.getPrenom());
        dto.setEmail(client.getEmail());
        dto.setTelephone(client.getTelephone());


        return dto;
    }

}
