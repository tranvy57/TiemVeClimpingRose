package vn.edu.iuh.fit.climpingrose.services;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.PaintingDTO;
import vn.edu.iuh.fit.climpingrose.entities.Painting;
import vn.edu.iuh.fit.climpingrose.mappers.PaintingMapper;
import vn.edu.iuh.fit.climpingrose.repositories.PaintingRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class PaintingService {
    private final PaintingRepository paintingRepository;
    private final PaintingMapper paintingMapper;

    public List<PaintingDTO> getAllPaintings(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Painting> paintingPage = paintingRepository.findAll(pageable);
        return paintingMapper.toPaintingDTOList(paintingPage.getContent());
    }
}
