package vn.edu.iuh.fit.climpingrose.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.CategoryDTO;
import vn.edu.iuh.fit.climpingrose.mappers.CategoryMapper;
import vn.edu.iuh.fit.climpingrose.repositories.CategoryRepository;
import vn.edu.iuh.fit.climpingrose.repositories.PaintingRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toCategoryDTO)
                .collect(Collectors.toList());
    }
}
