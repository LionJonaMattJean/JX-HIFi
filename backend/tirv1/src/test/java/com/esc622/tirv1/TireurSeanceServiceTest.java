package com.esc622.tirv1;

import com.esc622.tirv1.entity.Seance;
import com.esc622.tirv1.entity.Tireur;
import com.esc622.tirv1.entity.TireurSeance;
import com.esc622.tirv1.repository.TireurSeanceRepository;
import com.esc622.tirv1.service.TireurSeanceService;
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

class TireurSeanceServiceTest {

    @Mock
    private TireurSeanceRepository tireurSeanceRepository;

    @InjectMocks
    private TireurSeanceService tireurSeanceService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void findAllReturnsListOfTireurSeance() {
        TireurSeance tireurSeance1 = new TireurSeance();
        TireurSeance tireurSeance2 = new TireurSeance();
        when(tireurSeanceRepository.findAll()).thenReturn(Arrays.asList(tireurSeance1, tireurSeance2));

        List<TireurSeance> result = tireurSeanceService.findAll();

        assertEquals(2, result.size());
        verify(tireurSeanceRepository, times(1)).findAll();
    }

    @Test
    void findByIdReturnsTireurSeanceWhenFound() {
        TireurSeance tireurSeance = new TireurSeance();
        when(tireurSeanceRepository.findById(1L)).thenReturn(Optional.of(tireurSeance));

        Optional<TireurSeance> result = tireurSeanceService.findById(1L);

        assertTrue(result.isPresent());
        assertEquals(tireurSeance, result.get());
        verify(tireurSeanceRepository, times(1)).findById(1L);
    }

    @Test
    void findByIdReturnsEmptyWhenNotFound() {
        when(tireurSeanceRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<TireurSeance> result = tireurSeanceService.findById(1L);

        assertFalse(result.isPresent());
        verify(tireurSeanceRepository, times(1)).findById(1L);
    }

    @Test
    void saveReturnsSavedTireurSeance() {
        TireurSeance tireurSeance = new TireurSeance();
        when(tireurSeanceRepository.save(tireurSeance)).thenReturn(tireurSeance);

        TireurSeance result = tireurSeanceService.save(tireurSeance);

        assertEquals(tireurSeance, result);
        verify(tireurSeanceRepository, times(1)).save(tireurSeance);
    }

    @Test
    void deleteByIdDeletesTireurSeance() {
        doNothing().when(tireurSeanceRepository).deleteById(1L);

        tireurSeanceService.deleteById(1L);

        verify(tireurSeanceRepository, times(1)).deleteById(1L);
    }

    @Test
    void findByIdWithTireurAndSeanceReturnsTireurSeanceWhenFound() {
        TireurSeance tireurSeance = mock(TireurSeance.class);
        when(tireurSeanceRepository.findById(1L)).thenReturn(Optional.of(tireurSeance));
        when(tireurSeance.getSeance()).thenReturn(mock(Seance.class));
        when(tireurSeance.getTireur()).thenReturn(mock(Tireur.class));

        TireurSeance result = tireurSeanceService.findByIdWithTireurAndSeance(1L);

        assertEquals(tireurSeance, result);
        verify(tireurSeanceRepository, times(1)).findById(1L);
        verify(tireurSeance.getSeance(), times(1)).getId();
        verify(tireurSeance.getTireur(), times(1)).getId();
    }

    @Test
    void findByIdWithTireurAndSeanceThrowsExceptionWhenNotFound() {
        when(tireurSeanceRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> tireurSeanceService.findByIdWithTireurAndSeance(1L));
        verify(tireurSeanceRepository, times(1)).findById(1L);
    }
}