package vn.edu.iuh.fit.climpingrose.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.edu.iuh.fit.climpingrose.enums.PaintingSize;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "paintings",
        indexes = {
            @Index(name = "idx_painting_size", columnList = "size"),
            @Index(name = "idx_painting_is_active", columnList = "is_active")
})
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
    String paintingId;

    String name;
    String description;
    @Column(length = 500)
    String imageUrl;

    @Enumerated(EnumType.STRING)
    PaintingSize size;

    BigDecimal price;

    @ManyToMany
    @JoinTable(
            name = "category_painting",
            joinColumns = @JoinColumn(name = "painting_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    Set<Category> categories;

    @OneToMany(mappedBy = "painting", fetch = FetchType.LAZY)
    private List<CategoryPainting> categoryPaintings;
}
