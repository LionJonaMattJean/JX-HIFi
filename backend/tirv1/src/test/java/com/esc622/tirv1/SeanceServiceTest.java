package com.esc622.tirv1;

import com.esc622.tirv1.entity.Seance;
import com.esc622.tirv1.repository.SeanceRepository;
import com.esc622.tirv1.service.SeanceService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SeanceServiceTest {

    @Mock
    private SeanceRepository seanceRepository;

    @InjectMocks
    private SeanceService seanceService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void findAllReturnsListOfSeances() {
        Seance seance1 = new Seance();
        Seance seance2 = new Seance();
        when(seanceRepository.findAll()).thenReturn(Arrays.asList(seance1, seance2));

        List<Seance> result = seanceService.findAll();

        assertEquals(2, result.size());
        verify(seanceRepository, times(1)).findAll();
    }

    @Test
    void findByIdReturnsSeanceWhenIdExists() {
        Seance seance = new Seance();
        when(seanceRepository.findById(1L)).thenReturn(Optional.of(seance));

        Optional<Seance> result = seanceService.findById(1L);

        assertTrue(result.isPresent());
        assertEquals(seance, result.get());
        verify(seanceRepository, times(1)).findById(1L);
    }

    @Test
    void findByIdReturnsEmptyWhenIdDoesNotExist() {
        when(seanceRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<Seance> result = seanceService.findById(1L);

        assertFalse(result.isPresent());
        verify(seanceRepository, times(1)).findById(1L);
    }

    @Test
    void saveReturnsSavedSeance() {
        Seance seance = new Seance();
        when(seanceRepository.save(seance)).thenReturn(seance);

        Seance result = seanceService.save(seance);

        assertEquals(seance, result);
        verify(seanceRepository, times(1)).save(seance);
    }

    @Test
    void deleteByIdDeletesSeance() {
        doNothing().when(seanceRepository).deleteById(1L);

        seanceService.deleteById(1L);

        verify(seanceRepository, times(1)).deleteById(1L);
    }

    @Test
    void findByIdWithTireurSeancesReturnsSeanceWhenIdExists() {
        Seance seance = mock(Seance.class);
        when(seanceRepository.findById(1L)).thenReturn(Optional.of(seance));
        when(seance.getTireurSeances()).thenReturn(new ArrayList<>());

        Seance result = seanceService.findByIdWithTireurSeances(1L);

        assertEquals(seance, result);
        verify(seanceRepository, times(1)).findById(1L);
        verify(seance, times(1)).getTireurSeances();
    }

    @Test
    void findByIdWithTireurSeancesThrowsExceptionWhenIdDoesNotExist() {
        when(seanceRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> seanceService.findByIdWithTireurSeances(1L));
        verify(seanceRepository, times(1)).findById(1L);
    }
}