package vn.edu.iuh.fit.climpingrose.services;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.PaintingDTO;
import vn.edu.iuh.fit.climpingrose.dtos.responses.PageResponse;
import vn.edu.iuh.fit.climpingrose.entities.Painting;
import vn.edu.iuh.fit.climpingrose.exceptions.BadRequestException;
import vn.edu.iuh.fit.climpingrose.mappers.PaintingMapper;
import vn.edu.iuh.fit.climpingrose.repositories.PaintingRepository;
import vn.edu.iuh.fit.climpingrose.repositories.specifications.PaintingSpecifications;

import java.util.List;

@Service
@AllArgsConstructor
public class PaintingService {
    private final PaintingRepository paintingRepository;
    private final PaintingMapper paintingMapper;

    public PageResponse<PaintingDTO> getAllPaintings(int page, int size, List<String> categoryIds, List<String> sizes, Boolean isActive, String keyword) {
        if (page <= 0) {
            throw new BadRequestException("Page number must be zero or greater");
        }
        if (size <= 0) {
            throw new BadRequestException("Page size must be greater than zero");
        }
        int pageNumber = page - 1; // Convert to zero-based index


        Pageable pageable = PageRequest.of(pageNumber, size);

        Specification<Painting> spec = Specification
                .where(PaintingSpecifications.hasCategoryIn(categoryIds))
                .and(PaintingSpecifications.hasSizeIn(sizes))
                .and(PaintingSpecifications.hasActive(isActive))
                .and(PaintingSpecifications.nameContains(keyword));

        Page<Painting> paintings = paintingRepository.findAll(spec, pageable);

        return PageResponse.from(paintings.map(paintingMapper::toPaintingDTO));
    }

    public PaintingDTO getPaintingById(String paintingId) {
        Painting painting = paintingRepository.findById(paintingId)
                .orElseThrow(() -> new BadRequestException("Painting not found with id: " + paintingId));
        return paintingMapper.toPaintingDTO(painting);
    }




}
