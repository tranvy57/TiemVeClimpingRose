package vn.edu.iuh.fit.climpingrose.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.climpingrose.entities.Order;
import vn.edu.iuh.fit.climpingrose.entities.User;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findOrdersByUser(User user);
    List<Order> findOrdersByUserOrderByOrderDateAsc(User user);
    Order getByUserAndOrderId(User user, String orderId);

    List<Order> findOrdersByUserOrderByOrderDateDesc(User user);
}