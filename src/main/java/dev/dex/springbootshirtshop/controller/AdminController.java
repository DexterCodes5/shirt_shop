package dev.dex.springbootshirtshop.controller;

import dev.dex.springbootshirtshop.entity.*;
import dev.dex.springbootshirtshop.exc.*;
import dev.dex.springbootshirtshop.service.*;
import dev.dex.springbootshirtshop.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final ShirtService shirtService;

    @Autowired
    public AdminController(ShirtService shirtService) {
        this.shirtService = shirtService;
    }

    @PostMapping
    public ResponseEntity<?> postShirt(@RequestHeader("Authorization") String token, @RequestBody Shirt shirt) {
        String userTypes = ExtractJWT.payloadJWTExtraction(token, "\"userTypes\"");
        if (!userTypes.contains("admin")) {
            throw new ForbiddenException("Access Denied");
        }
        shirtService.save(shirt);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping
    public ResponseEntity<?> deleteShirt(@RequestHeader("Authorization") String token, @RequestBody Shirt shirt) {
        String userTypes = ExtractJWT.payloadJWTExtraction(token, "\"userTypes\"");
        if (!userTypes.contains("admin")) {
            throw new ForbiddenException("Access Denied");
        }
        shirtService.delete(shirt);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
