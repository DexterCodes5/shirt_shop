package dev.dex.springbootshirtshop.repository;

import dev.dex.springbootshirtshop.entity.*;
import dev.dex.springbootshirtshop.util.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.web.bind.annotation.*;

public interface ShirtRepository extends JpaRepository<Shirt, Integer> {
    Page<Shirt> findByTitleContaining(@RequestParam("search") String search, Pageable pageable);
    Page<Shirt> findByColor(@RequestParam("color") Color color, Pageable pageable);

}
