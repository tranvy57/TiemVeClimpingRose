package vn.edu.iuh.fit.climpingrose.services;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.PaintingDTO;
import vn.edu.iuh.fit.climpingrose.dtos.responses.PageResponse;
import vn.edu.iuh.fit.climpingrose.entities.Painting;
import vn.edu.iuh.fit.climpingrose.exceptions.BadRequestException;
import vn.edu.iuh.fit.climpingrose.mappers.PaintingMapper;
import vn.edu.iuh.fit.climpingrose.repositories.PaintingRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class PaintingService {
    private final PaintingRepository paintingRepository;
    private final PaintingMapper paintingMapper;

    public PageResponse<PaintingDTO> getAllPaintings(int page, int size) {
        if (page <= 0) {
            throw new BadRequestException("Page number must be zero or greater");
        }
        if (size <= 0) {
            throw new BadRequestException("Page size must be greater than zero");
        }
        int pageNumber = page - 1; // Convert to zero-based index

        Pageable pageable = PageRequest.of(pageNumber, size);
        Page<Painting> paintings = paintingRepository.findAll(pageable);

        PageResponse<PaintingDTO> results = PageResponse.from(paintings.map(paintingMapper::toPaintingDTO));
        return results;
    }
}
