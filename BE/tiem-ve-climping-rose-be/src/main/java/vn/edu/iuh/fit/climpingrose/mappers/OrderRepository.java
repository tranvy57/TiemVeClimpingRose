package vn.edu.iuh.fit.climpingrose.mappers;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.climpingrose.entities.Order;

public interface OrderRepository extends JpaRepository<Order, String> {
}