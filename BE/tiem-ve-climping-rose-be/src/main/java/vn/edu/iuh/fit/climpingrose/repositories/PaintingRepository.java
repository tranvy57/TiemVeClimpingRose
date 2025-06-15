package vn.edu.iuh.fit.climpingrose.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import vn.edu.iuh.fit.climpingrose.entities.Painting;

import java.util.List;

public interface PaintingRepository extends JpaRepository<Painting, String> , JpaSpecificationExecutor<Painting> {
    @EntityGraph(attributePaths = {"categoryPaintings", "categoryPaintings.category"})
    Page<Painting> findAll(Specification<Painting> spec,Pageable pageable);
}