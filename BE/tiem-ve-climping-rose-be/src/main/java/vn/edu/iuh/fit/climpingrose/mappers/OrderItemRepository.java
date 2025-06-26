package vn.edu.iuh.fit.climpingrose.mappers;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.climpingrose.entities.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, String> {
}