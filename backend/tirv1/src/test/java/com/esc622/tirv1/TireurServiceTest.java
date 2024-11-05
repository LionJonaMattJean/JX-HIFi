package com.esc622.tirv1;

import com.esc622.tirv1.entity.Tireur;
import com.esc622.tirv1.entity.TireurSeance;
import com.esc622.tirv1.repository.TireurRepository;
import com.esc622.tirv1.service.TireurService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TireurServiceTest {

    @Mock
    private TireurRepository tireurRepository;

    @InjectMocks
    private TireurService tireurService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void findAllReturnsListOfTireur() {
        Tireur tireur1 = new Tireur();
        Tireur tireur2 = new Tireur();
        when(tireurRepository.findAll()).thenReturn(Arrays.asList(tireur1, tireur2));

        List<Tireur> result = tireurService.findAll();

        assertEquals(2, result.size());
        verify(tireurRepository, times(1)).findAll();
    }

    @Test
    void findByIdReturnsTireurWhenFound() {
        Tireur tireur = new Tireur();
        when(tireurRepository.findById(1L)).thenReturn(Optional.of(tireur));

        Optional<Tireur> result = tireurService.findById(1L);

        assertTrue(result.isPresent());
        assertEquals(tireur, result.get());
        verify(tireurRepository, times(1)).findById(1L);
    }

    @Test
    void findByIdReturnsEmptyWhenNotFound() {
        when(tireurRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<Tireur> result = tireurService.findById(1L);

        assertFalse(result.isPresent());
        verify(tireurRepository, times(1)).findById(1L);
    }

    @Test
    void saveReturnsSavedTireur() {
        Tireur tireur = new Tireur();
        when(tireurRepository.save(tireur)).thenReturn(tireur);

        Tireur result = tireurService.save(tireur);

        assertEquals(tireur, result);
        verify(tireurRepository, times(1)).save(tireur);
    }

    @Test
    void deleteByIdDeletesTireur() {
        doNothing().when(tireurRepository).deleteById(1L);

        tireurService.deleteById(1L);

        verify(tireurRepository, times(1)).deleteById(1L);
    }

    @Test
    void findByIdWithSeancesReturnsTireurWhenFound() {
        Tireur tireur = mock(Tireur.class);
        TireurSeance tireurSeance = mock(TireurSeance.class);
        when(tireurRepository.findById(1L)).thenReturn(Optional.of(tireur));
        when(tireur.getTireurSeances()).thenReturn(Arrays.asList(tireurSeance));

        Tireur result = tireurService.findByIdWithSeances(1L);

        assertEquals(tireur, result);
        verify(tireurRepository, times(1)).findById(1L);
        verify(tireur, times(1)).getTireurSeances();
    }

    @Test
    void findByIdWithSeancesThrowsExceptionWhenNotFound() {
        when(tireurRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> tireurService.findByIdWithSeances(1L));
        verify(tireurRepository, times(1)).findById(1L);
    }
}
