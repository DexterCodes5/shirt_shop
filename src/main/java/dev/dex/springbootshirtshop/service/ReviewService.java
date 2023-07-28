package dev.dex.springbootshirtshop.service;

import dev.dex.springbootshirtshop.entity.*;
import dev.dex.springbootshirtshop.repository.*;
import org.springframework.stereotype.*;

import java.time.*;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public void save(Review review) {
        review.setDate(LocalDate.now().toString());
        reviewRepository.save(review);
    }

    public boolean isReviewedByUser(String userEmail, long shirtId) {
        return reviewRepository.findFirstByUserEmailAndShirtId(userEmail, shirtId) != null;
    }
}
