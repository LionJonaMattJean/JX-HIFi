package com.esc622.tirv1.service;

import com.esc622.tirv1.entity.Tireur;
import com.esc622.tirv1.repository.TireurRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TireurService {

    private final TireurRepository tireurRepository;

    @Autowired
    public TireurService(TireurRepository tireurRepository) {
        this.tireurRepository = tireurRepository;
    }

    public List<Tireur> findAll(){
        return tireurRepository.findAll();
    }

    public Optional<Tireur> findById(long id){
        return tireurRepository.findById(id);
    }

    public Tireur save(Tireur tireur){
        return tireurRepository.save(tireur);
    }

    public void deleteById(long id){
        tireurRepository.deleteById(id);
    }
    @Transactional
    public Tireur findByIdWithSeances(long id){
       Tireur tireur = tireurRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Tireur not found"));
         tireur.getTireurSeances().size();
            return tireur;
    }




}
