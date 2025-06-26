package vn.edu.iuh.fit.climpingrose.services;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.PaintingResponse;
import vn.edu.iuh.fit.climpingrose.dtos.requests.PaintingCreationRequest;
import vn.edu.iuh.fit.climpingrose.dtos.responses.PageResponse;
import vn.edu.iuh.fit.climpingrose.entities.Category;
import vn.edu.iuh.fit.climpingrose.entities.CategoryPainting;
import vn.edu.iuh.fit.climpingrose.entities.Painting;
import vn.edu.iuh.fit.climpingrose.exceptions.BadRequestException;
import vn.edu.iuh.fit.climpingrose.mappers.CategoryPaintingRepository;
import vn.edu.iuh.fit.climpingrose.mappers.PaintingMapper;
import vn.edu.iuh.fit.climpingrose.repositories.CategoryRepository;
import vn.edu.iuh.fit.climpingrose.repositories.PaintingRepository;
import vn.edu.iuh.fit.climpingrose.repositories.specifications.PaintingSpecifications;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@AllArgsConstructor
public class PaintingService {
    private final PaintingRepository paintingRepository;
    private final PaintingMapper paintingMapper;
    private final CategoryRepository categoryRepository;
    private final CategoryPaintingRepository categoryPaintingRepository;

    public PageResponse<PaintingResponse> getAllPaintings(int page, int size, List<String> categoryIds, List<String> sizes, Boolean isActive, String keyword, String sortBy) {
        if (page <= 0) {
            throw new BadRequestException("Page number must be zero or greater");
        }
        if (size <= 0) {
            throw new BadRequestException("Page size must be greater than zero");
        }
        int pageNumber = page - 1; // Convert to zero-based index

        Sort sortOrder = Sort.unsorted();

        if (sortBy != null && !sortBy.isEmpty()) {
            switch (sortBy) {
                case "price-asc":
                    sortOrder = Sort.by(Sort.Direction.ASC, "price");
                    break;
                case "price-desc":
                    sortOrder = Sort.by(Sort.Direction.DESC, "price");
                    break;
                case "created-asc":
                    sortOrder = Sort.by(Sort.Direction.ASC, "createdAt");
                    break;
                case "created-desc":
                default:
                    sortOrder = Sort.by(Sort.Direction.DESC, "createdAt"); // mặc định
                    break;
            }
        }

        Pageable pageable = PageRequest.of(pageNumber, size, sortOrder);

        Specification<Painting> spec = Specification
                .where(PaintingSpecifications.hasCategoryIn(categoryIds))
                .and(PaintingSpecifications.hasSizeIn(sizes))
                .and(PaintingSpecifications.hasActive(isActive))
                .and(PaintingSpecifications.nameContains(keyword));

        Page<Painting> paintings = paintingRepository.findAll(spec, pageable);

        return PageResponse.from(paintings.map(paintingMapper::toPaintingResponse));
    }

    public PaintingResponse getPaintingById(String paintingId) {
        Painting painting = paintingRepository.findById(paintingId)
                .orElseThrow(() -> new BadRequestException("Painting not found with id: " + paintingId));
        return paintingMapper.toPaintingResponse(painting);
    }

    public PaintingResponse createPainting(PaintingCreationRequest request) {
        List<Category> categories = categoryRepository.findAllById(request.getCategoryIds());

        String paintingId = generatePaintingId(categories, request.getName());

        Painting painting = paintingMapper.toEntity(request);
        painting.setPaintingId(paintingId);
        Painting savedPainting = paintingRepository.save(painting);


        List<CategoryPainting> categoryPaintings = categories.stream()
                .map(category -> CategoryPainting.builder()
                        .category(category)
                        .painting(savedPainting)
                        .build(
                ))
                .toList();

        categoryPaintingRepository.saveAll(categoryPaintings);
        savedPainting.setCategoryPaintings(categoryPaintings);
        return paintingMapper.toPaintingResponse(savedPainting);
    }

    public static String generatePaintingId(List<Category> categories, String paintingName) {
        StringBuilder sb = new StringBuilder();

        // Gắn mã category
        for (Category category : categories) {
            sb.append(normalize(category.getName())).append("-");
        }

        // Gắn tên tranh
        sb.append(normalize(paintingName)).append("-");

        // Gắn ngày tạo: lấy ngày hiện tại
        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        sb.append(now);



        return sb.toString().toLowerCase();
    }

    private static String normalize(String input) {
        if (input == null) return "unknown";
        return input.replaceAll("[^a-zA-Z0-9]", "-").replaceAll("-+", "-").toLowerCase();
    }


}
