package com.esc622.tirv1.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "tireur_seance")
@Getter
@Setter
public class TireurSeance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    private double moyenneCoucher;
    private double moyenneDebout;
    private double moyenneGroupementCoucher;
    private double moyenneGroupementDebout;

    private double bestCoucher;
    private double bestDebout;
    private double bestGroupementCoucher;
    private double bestGroupementDebout;

    private Boolean absence;
    private Boolean retard;

    @OneToMany(mappedBy = "tireurSeance",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<CiblePointage> ciblePointages;

    @ManyToOne
    @JoinColumn(name = "seance_id")
    private Seance seance;


    @ManyToOne
    @JoinColumn(name = "tireur_id")
    private Tireur tireur;
}
