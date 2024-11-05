package com.esc622.tirv1.service;

import com.esc622.tirv1.entity.Cible;
import com.esc622.tirv1.repository.CibleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CibleService {

    private final CibleRepository cibleRepository;

    @Autowired
    public CibleService(CibleRepository cibleRepository) {
        this.cibleRepository = cibleRepository;
    }

    public List<Cible> findAll(){
        return cibleRepository.findAll();
    }

    public Optional<Cible> findById(long id){
        return cibleRepository.findById(id);
    }

    public Cible save(Cible cible){
        return cibleRepository.save(cible);
    }

    public void deleteById(long id){
        cibleRepository.deleteById(id);
    }
}
