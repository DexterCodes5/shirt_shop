package dev.dex.springbootshirtshop.repository;

import dev.dex.springbootshirtshop.entity.*;
import org.springframework.data.jpa.repository.*;

public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {
}
