package dev.dex.springbootshirtshop.repository;

import dev.dex.springbootshirtshop.entity.*;
import org.springframework.data.jpa.repository.*;

import java.util.*;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Review findFirstByUserEmailAndShirtId(String userEmail, long shirtId);
    List<Review> findByShirtId(long shirtId);
}
