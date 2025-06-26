package vn.edu.iuh.fit.climpingrose.mappers;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.climpingrose.entities.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, String> {
}