package dev.dex.springbootshirtshop.controller;

import dev.dex.springbootshirtshop.entity.*;
import dev.dex.springbootshirtshop.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/question")
public class QuestionController {
    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping("/secure")
    public ResponseEntity<?> postQuestion(@RequestBody Question question) {
        questionService.save(question);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
