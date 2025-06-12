package vn.edu.iuh.fit.climpingrose.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "paintings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Painting extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String name;
    String description;
    String imageUrl;
    String size;
    BigDecimal price;


}
