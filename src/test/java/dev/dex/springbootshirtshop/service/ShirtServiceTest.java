package dev.dex.springbootshirtshop.service;

import dev.dex.springbootshirtshop.entity.*;
import dev.dex.springbootshirtshop.repository.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.*;
import org.mockito.*;
import org.mockito.junit.jupiter.*;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class ShirtServiceTest {
    @Mock
    private ShirtRepository shirtRepository;
    @Mock
    private CartItemRepository cartItemRepository;
    private ShirtService underTest;

    @BeforeEach
    void setUp() {
        underTest = new ShirtService(shirtRepository, cartItemRepository);
    }

    @Test
    void canSave() {
        // given
        Shirt shirt = new Shirt();

        // when
        underTest.save(shirt);

        // then
        ArgumentCaptor<Shirt> shirtArgumentCaptor = ArgumentCaptor.forClass(Shirt.class);
        verify(shirtRepository).save(shirtArgumentCaptor.capture());
        assertThat(shirtArgumentCaptor.getValue()).isEqualTo(shirt);
    }

    @Test
    void canDelete() {
        // given
        Shirt shirt = new Shirt();

        // when
        underTest.delete(shirt);

        // then
        ArgumentCaptor<Shirt> shirtArgumentCaptor = ArgumentCaptor.forClass(Shirt.class);
        verify(cartItemRepository).deleteByShirt(shirtArgumentCaptor.capture());
        assertThat(shirtArgumentCaptor.getValue()).isEqualTo(shirt);

        verify(shirtRepository).delete(shirtArgumentCaptor.capture());
        assertThat(shirtArgumentCaptor.getValue()).isEqualTo(shirt);
    }
}