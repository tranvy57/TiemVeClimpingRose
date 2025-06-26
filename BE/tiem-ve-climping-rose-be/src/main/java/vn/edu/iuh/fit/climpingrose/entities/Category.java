package vn.edu.iuh.fit.climpingrose.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.validator.constraints.Length;

import java.math.BigDecimal;

@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Category extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String categoryId;
    String categoryCode;
    String name;
    String description;
    @Length(max = 500)
    String imageUrl;
}
