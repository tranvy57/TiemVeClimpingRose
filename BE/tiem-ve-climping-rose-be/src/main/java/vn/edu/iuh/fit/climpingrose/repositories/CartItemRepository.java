package vn.edu.iuh.fit.climpingrose.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.climpingrose.entities.CartItem;
import vn.edu.iuh.fit.climpingrose.entities.Painting;
import vn.edu.iuh.fit.climpingrose.entities.User;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, String> {
    List<CartItem> findCartItemsByUser(User user);

    CartItem findByUserAndPainting(User user, Painting painting);
}