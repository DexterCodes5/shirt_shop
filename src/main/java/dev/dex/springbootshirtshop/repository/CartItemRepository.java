package dev.dex.springbootshirtshop.repository;

import dev.dex.springbootshirtshop.entity.*;
import org.springframework.data.jpa.repository.*;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    void deleteByShirt(Shirt shirt);
}
