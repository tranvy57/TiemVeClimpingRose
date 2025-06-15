package vn.edu.iuh.fit.climpingrose.repositories.specifications;

import jakarta.persistence.criteria.Join;
import org.springframework.boot.autoconfigure.rsocket.RSocketProperties;
import org.springframework.data.jpa.domain.Specification;
import vn.edu.iuh.fit.climpingrose.entities.Painting;

import java.util.List;

public class PaintingSpecifications {
    public static Specification<Painting> hasSizeIn(List<String> sizes) {
        return (root, query, criteriaBuilder) -> {
            if (sizes == null || sizes.isEmpty()) {
                return criteriaBuilder.conjunction(); // No filter applied
            }
            return root.get("size").in(sizes);
        };
    }

    public static Specification<Painting> hasCategoryIn(List<String> categoryIds) {
        return (root, query, criteriaBuilder) -> {
            if (categoryIds == null || categoryIds.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            // Join từ Painting → CategoryPainting → Category
            Join<Object, Object> categoryJoin = root.join("categoryPaintings").join("category");

            return categoryJoin.get("categoryId").in(categoryIds);
        };
    }

    public static Specification<Painting> nameContains(String keyword) {
        return (root, query, builder) -> {
            if (keyword == null || keyword.trim().isEmpty()) {
                return builder.conjunction();
            }

            return builder.like(
                    builder.lower(root.get("name")),
                    "%" + keyword.toLowerCase() + "%"
            );
        };
    }


    public static Specification<Painting> hasActive(Boolean active) {
        return (root, query, criteriaBuilder) -> {
            if (active == null) {
                return criteriaBuilder.conjunction(); // No filter applied
            }
            return criteriaBuilder.equal(root.get("isActive"), active);
        };
    }

}
