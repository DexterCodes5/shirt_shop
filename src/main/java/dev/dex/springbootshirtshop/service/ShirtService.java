package dev.dex.springbootshirtshop.service;

import dev.dex.springbootshirtshop.entity.*;
import dev.dex.springbootshirtshop.repository.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;

@Service
public class ShirtService {
    private final ShirtRepository shirtRepository;
    private final CartItemRepository cartItemRepository;

    public ShirtService(ShirtRepository shirtRepository, CartItemRepository cartItemRepository) {
        this.shirtRepository = shirtRepository;
        this.cartItemRepository = cartItemRepository;
    }

    public void save(Shirt shirt) {
        shirtRepository.save(shirt);
    }

    @Transactional
    public void delete(Shirt shirt) {
        cartItemRepository.deleteByShirt(shirt);
        shirtRepository.delete(shirt);
    }
}
