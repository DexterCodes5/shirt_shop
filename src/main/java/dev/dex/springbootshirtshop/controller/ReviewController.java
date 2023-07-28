package dev.dex.springbootshirtshop.controller;

import dev.dex.springbootshirtshop.entity.*;
import dev.dex.springbootshirtshop.service.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/review")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/secure/postreview")
    public ResponseEntity<?> postReview(@RequestBody Review review) {
        reviewService.save(review);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/secure/isreviewed/byuser")
    public ResponseEntity<?> isReviewedByUser(@RequestParam String userEmail,
                                              @RequestParam long shirtId) {
        return ResponseEntity.status(HttpStatus.OK).body(reviewService.isReviewedByUser(userEmail, shirtId));
    }
}
