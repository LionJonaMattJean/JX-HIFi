package com.esc622.tirv1.service;

import com.esc622.tirv1.entity.TireurSeance;
import com.esc622.tirv1.repository.TireurSeanceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TireurSeanceService {

    private final TireurSeanceRepository tireurSeanceRepository;

    @Autowired
    public TireurSeanceService(TireurSeanceRepository tireurSeanceRepository) {
        this.tireurSeanceRepository = tireurSeanceRepository;
    }

    public List<TireurSeance> findAll(){
        return tireurSeanceRepository.findAll();
    }

    public Optional<TireurSeance> findById(long id){
        return tireurSeanceRepository.findById(id);
    }

    public TireurSeance save(TireurSeance tireurSeance){
        return tireurSeanceRepository.save(tireurSeance);
    }

    public void deleteById(long id){
        tireurSeanceRepository.deleteById(id);
    }

    @Transactional
    public TireurSeance findByIdWithTireurAndSeance(long id){
        TireurSeance tireurSeance = tireurSeanceRepository.findById(id).orElseThrow(()->new EntityNotFoundException("TireurSeance not found"));
        tireurSeance.getSeance().getId();
        tireurSeance.getTireur().getId();

        return tireurSeance;
    }
}
