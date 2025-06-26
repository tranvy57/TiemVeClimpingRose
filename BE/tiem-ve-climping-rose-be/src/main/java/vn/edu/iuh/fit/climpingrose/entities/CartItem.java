package vn.edu.iuh.fit.climpingrose.entities;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "cart_items")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String cartItemId;

    int quantity;

    @ManyToOne
    @JoinColumn(name = "painting_id")
    Painting painting;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

}
