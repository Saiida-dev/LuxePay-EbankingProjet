package org.example.ebankingbackendv2.controller;

import org.example.ebankingbackendv2.entity.Compte;
import org.example.ebankingbackendv2.service.interfaces.CompteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comptes")
@CrossOrigin(origins = "*")
public class CompteController {

    @Autowired
    private CompteService compteService;

    @GetMapping
    public List<Compte> getAllComptes() {
        return compteService.getAllComptes();
    }

    @GetMapping("/{id}")
    public Compte getCompteById(@PathVariable("id") Long id) {
        return compteService.getCompteById(id);
    }

    @PostMapping
    public Compte createCompte(@RequestBody Compte compte) {
        return compteService.createCompte(compte);
    }

    @PutMapping("/{id}")
    public Compte updateCompte(@PathVariable("id") Long id, @RequestBody Compte compte) {
        return compteService.updateCompte(id, compte);
    }

    @DeleteMapping("/{id}")
    public void deleteCompte(@PathVariable("id") Long id) {
        compteService.deleteCompte(id);
    }
}
