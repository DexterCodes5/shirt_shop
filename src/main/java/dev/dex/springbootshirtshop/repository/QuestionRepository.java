package dev.dex.springbootshirtshop.repository;

import dev.dex.springbootshirtshop.entity.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.web.bind.annotation.*;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findByUserEmail(@RequestParam String userEmail, Pageable pageable);
    Page<Question> findByResponseIsNull(Pageable pageable);
}
