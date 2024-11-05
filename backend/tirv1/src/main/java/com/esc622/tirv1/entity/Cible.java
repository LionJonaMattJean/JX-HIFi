package com.esc622.tirv1.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
public class Cible {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String type;

    @OneToMany(mappedBy = "cible",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CiblePointage> ciblePointage;

}
