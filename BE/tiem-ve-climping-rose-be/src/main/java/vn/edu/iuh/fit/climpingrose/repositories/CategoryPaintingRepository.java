package vn.edu.iuh.fit.climpingrose.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.climpingrose.entities.CategoryPainting;

public interface CategoryPaintingRepository extends JpaRepository<CategoryPainting, String> {
}