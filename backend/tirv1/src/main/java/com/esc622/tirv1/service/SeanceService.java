package com.esc622.tirv1.service;

import com.esc622.tirv1.entity.Seance;
import com.esc622.tirv1.repository.SeanceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SeanceService {

    private final SeanceRepository seanceRepository;

    @Autowired
    public SeanceService(SeanceRepository seanceRepository) {
        this.seanceRepository = seanceRepository;
    }

    public List<Seance> findAll(){
        return seanceRepository.findAll();
    }

    public Optional<Seance> findById(long id){
        return seanceRepository.findById(id);
    }

    public Seance save(Seance seance){
        return seanceRepository.save(seance);
    }

    public void deleteById(long id){
        seanceRepository.deleteById(id);
    }

    @Transactional
    public Seance findByIdWithTireurSeances(long id) {
        Seance seance = seanceRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Seance not found"));
        seance.getTireurSeances().size(); // Force lazy loading
        return seance;
    }

}
