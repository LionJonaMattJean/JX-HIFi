package com.esc622.tirv1.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;


@Setter
@Getter
@Entity
public class Tireur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nom;
    private LocalDate dob;
    @OneToMany(mappedBy = "tireur",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TireurSeance> tireurSeances;
    public Tireur() {
    }

    public Tireur(String nom, LocalDate dob) {
        this.nom = nom;
        this.dob = dob;
    }

}
