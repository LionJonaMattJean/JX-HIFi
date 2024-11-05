package com.esc622.tirv1.service;

import com.esc622.tirv1.entity.CiblePointage;
import com.esc622.tirv1.repository.CiblePointageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CiblePointageService {

    private final CiblePointageRepository ciblePointageRepository;

    @Autowired
    public CiblePointageService(CiblePointageRepository ciblePointageRepository) {
        this.ciblePointageRepository = ciblePointageRepository;
    }

    public List<CiblePointage> findAll(){
        return ciblePointageRepository.findAll();
    }

    public Optional<CiblePointage> findById(long id){
        return ciblePointageRepository.findById(id);
    }

    public CiblePointage save(CiblePointage ciblePointage){
        return ciblePointageRepository.save(ciblePointage);
    }

    public void deleteById(long id){
        ciblePointageRepository.deleteById(id);
    }
}
