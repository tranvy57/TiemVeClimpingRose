package vn.edu.iuh.fit.climpingrose.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "category_painting")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryPainting{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String categoryPaintingId;

    @ManyToOne
    @JoinColumn(name = "category_id")
    Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "painting_id")
    Painting painting;
}
