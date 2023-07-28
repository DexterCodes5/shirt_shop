package dev.dex.springbootshirtshop.service;

import dev.dex.springbootshirtshop.entity.*;
import dev.dex.springbootshirtshop.repository.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.*;
import org.mockito.*;
import org.mockito.junit.jupiter.*;

import java.time.*;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class ReviewServiceTest {
    @Mock
    private ReviewRepository reviewRepository;
    private ReviewService underTest;

    @BeforeEach
    void setUp() {
        underTest = new ReviewService(reviewRepository);
    }

    @Test
    void canSave() {
        // given
        Review review = new Review();

        // when
        underTest.save(review);

        // then
        assertThat(review.getDate()).isEqualTo(LocalDate.now().toString());
        ArgumentCaptor<Review> reviewArgumentCaptor = ArgumentCaptor.forClass(Review.class);
        verify(reviewRepository).save(reviewArgumentCaptor.capture());
        assertThat(reviewArgumentCaptor.getValue()).isEqualTo(review);
    }

    @Test
    void canIsReviewedByUser() {
        // given
        String userEmail = "dexter@mail.com";
        long shirtId = 1;

        // when
        underTest.isReviewedByUser(userEmail, shirtId);

        // then
        ArgumentCaptor<String> userEmailArgumentCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<Long> shirtIdArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        verify(reviewRepository).findFirstByUserEmailAndShirtId(userEmailArgumentCaptor.capture(),
                shirtIdArgumentCaptor.capture());
        assertThat(userEmailArgumentCaptor.getValue()).isEqualTo(userEmail);
        assertThat(shirtIdArgumentCaptor.getValue()).isEqualTo(shirtId);
    }
}