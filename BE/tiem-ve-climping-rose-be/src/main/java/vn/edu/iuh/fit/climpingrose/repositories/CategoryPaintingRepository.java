package vn.edu.iuh.fit.climpingrose.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.climpingrose.entities.CategoryPainting;
import vn.edu.iuh.fit.climpingrose.entities.Painting;

public interface CategoryPaintingRepository extends JpaRepository<CategoryPainting, String> {
    void deleteByPainting(Painting painting);
}