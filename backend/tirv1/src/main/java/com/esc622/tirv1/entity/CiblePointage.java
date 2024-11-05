package com.esc622.tirv1.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "cible_pointage")
@Setter
@Getter
public class CiblePointage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private double pointage;

    @ManyToOne
    @JoinColumn(name = "cible_id")
    private Cible cible;
    @ManyToOne
    @JoinColumn(name = "tireur_seance_id")
    private TireurSeance tireurSeance;
}
