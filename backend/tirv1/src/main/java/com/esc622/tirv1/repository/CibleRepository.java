package com.esc622.tirv1.repository;

import com.esc622.tirv1.entity.Cible;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CibleRepository extends JpaRepository<Cible, Long> {


}