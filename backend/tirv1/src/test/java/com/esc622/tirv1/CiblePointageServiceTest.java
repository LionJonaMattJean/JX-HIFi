package com.esc622.tirv1;

import com.esc622.tirv1.entity.CiblePointage;
import com.esc622.tirv1.repository.CiblePointageRepository;
import com.esc622.tirv1.service.CiblePointageService;
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

class CiblePointageServiceTest {

    @Mock
    private CiblePointageRepository ciblePointageRepository;

    @InjectMocks
    private CiblePointageService ciblePointageService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void findAllReturnsListOfCiblePointage() {
        CiblePointage cible1 = new CiblePointage();
        CiblePointage cible2 = new CiblePointage();
        when(ciblePointageRepository.findAll()).thenReturn(Arrays.asList(cible1, cible2));

        List<CiblePointage> result = ciblePointageService.findAll();

        assertEquals(2, result.size());
        verify(ciblePointageRepository, times(1)).findAll();
    }

    @Test
    void findByIdReturnsCiblePointageWhenIdExists() {
        CiblePointage cible = new CiblePointage();
        when(ciblePointageRepository.findById(1L)).thenReturn(Optional.of(cible));

        Optional<CiblePointage> result = ciblePointageService.findById(1L);

        assertTrue(result.isPresent());
        assertEquals(cible, result.get());
        verify(ciblePointageRepository, times(1)).findById(1L);
    }

    @Test
    void findByIdReturnsEmptyWhenIdDoesNotExist() {
        when(ciblePointageRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<CiblePointage> result = ciblePointageService.findById(1L);

        assertFalse(result.isPresent());
        verify(ciblePointageRepository, times(1)).findById(1L);
    }

    @Test
    void saveReturnsSavedCiblePointage() {
        CiblePointage cible = new CiblePointage();
        when(ciblePointageRepository.save(cible)).thenReturn(cible);

        CiblePointage result = ciblePointageService.save(cible);

        assertEquals(cible, result);
        verify(ciblePointageRepository, times(1)).save(cible);
    }

    @Test
    void deleteByIdDeletesCiblePointage() {
        doNothing().when(ciblePointageRepository).deleteById(1L);

        ciblePointageService.deleteById(1L);

        verify(ciblePointageRepository, times(1)).deleteById(1L);
    }
}