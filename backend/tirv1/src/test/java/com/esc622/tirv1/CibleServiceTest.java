package com.esc622.tirv1;

import com.esc622.tirv1.entity.Cible;
import com.esc622.tirv1.repository.CibleRepository;
import com.esc622.tirv1.service.CibleService;
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

class CibleServiceTest {

    @Mock
    private CibleRepository cibleRepository;

    @InjectMocks
    private CibleService cibleService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void findAllReturnsListOfCible() {
        Cible cible1 = new Cible();
        Cible cible2 = new Cible();
        when(cibleRepository.findAll()).thenReturn(Arrays.asList(cible1, cible2));

        List<Cible> result = cibleService.findAll();

        assertEquals(2, result.size());
        verify(cibleRepository, times(1)).findAll();
    }

    @Test
    void findByIdReturnsCibleWhenFound() {
        Cible cible = new Cible();
        when(cibleRepository.findById(1L)).thenReturn(Optional.of(cible));

        Optional<Cible> result = cibleService.findById(1L);

        assertTrue(result.isPresent());
        assertEquals(cible, result.get());
        verify(cibleRepository, times(1)).findById(1L);
    }

    @Test
    void findByIdReturnsEmptyWhenNotFound() {
        when(cibleRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<Cible> result = cibleService.findById(1L);

        assertFalse(result.isPresent());
        verify(cibleRepository, times(1)).findById(1L);
    }

    @Test
    void saveReturnsSavedCible() {
        Cible cible = new Cible();
        when(cibleRepository.save(cible)).thenReturn(cible);

        Cible result = cibleService.save(cible);

        assertEquals(cible, result);
        verify(cibleRepository, times(1)).save(cible);
    }

    @Test
    void deleteByIdDeletesCible() {
        doNothing().when(cibleRepository).deleteById(1L);

        cibleService.deleteById(1L);

        verify(cibleRepository, times(1)).deleteById(1L);
    }
}