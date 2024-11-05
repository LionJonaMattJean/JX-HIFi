package com.esc622.tirv1.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Seance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String date;
    @OneToMany(mappedBy = "seance",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TireurSeance> tireurSeances;

    public Seance() {
        this.tireurSeances = new ArrayList<>();
    }

    public Seance(String date) {
        this.date = date;
        this.tireurSeances = new ArrayList<>();
    }

}
