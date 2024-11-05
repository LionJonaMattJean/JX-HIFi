package com.esc622.tirv1.repository;

import com.esc622.tirv1.entity.CiblePointage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CiblePointageRepository extends JpaRepository<CiblePointage, Long> {
}