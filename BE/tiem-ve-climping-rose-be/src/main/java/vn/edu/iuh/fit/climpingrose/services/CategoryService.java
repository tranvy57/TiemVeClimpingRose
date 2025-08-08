package vn.edu.iuh.fit.climpingrose.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.CategoryDTO;
import vn.edu.iuh.fit.climpingrose.entities.CategoryPainting;
import vn.edu.iuh.fit.climpingrose.mappers.CategoryMapper;
import vn.edu.iuh.fit.climpingrose.repositories.CategoryPaintingRepository;
import vn.edu.iuh.fit.climpingrose.repositories.CategoryRepository;
import vn.edu.iuh.fit.climpingrose.repositories.PaintingRepository;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final RedisService redisService;
    private final ObjectMapper objectMapper;

    public List<CategoryDTO> getAllCategories() {
        try {
            String cached = redisService.getCategories();
            if (cached != null) {
                // Trả về từ cache nếu có
                CategoryDTO[] arr = objectMapper.readValue(cached, CategoryDTO[].class);
                return Arrays.asList(arr);
            }

            //  Không có cache → lấy từ DB
            List<CategoryDTO> categories = categoryRepository.findAll()
                    .stream()
                    .map(categoryMapper::toCategoryDTO)
                    .collect(Collectors.toList());

            // Lưu cache
            redisService.saveCategories(objectMapper.writeValueAsString(categories));
            return categories;
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Lỗi xử lý JSON cho danh mục", e);
        }
    }

    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        var category = categoryMapper.toCatgory(categoryDTO);
        var saved = categoryRepository.save(category);

        refreshCategoryCache();

        return categoryMapper.toCategoryDTO(saved);
    }

    private void refreshCategoryCache() {
        List<CategoryDTO> categories = categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toCategoryDTO)
                .collect(Collectors.toList());
        try {
            redisService.saveCategories(objectMapper.writeValueAsString(categories));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    public CategoryDTO updateCategory(String categoryId, CategoryDTO categoryDTO) {
        var existingCategory = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (categoryDTO.getName() != null) {
            existingCategory.setName(categoryDTO.getName());
        }

        if (categoryDTO.getDescription() != null) {
            existingCategory.setDescription(categoryDTO.getDescription());
        }

        if(categoryDTO.getCategoryCode() != null) {
            existingCategory.setCategoryCode(categoryDTO.getCategoryCode());
        }

        var updatedCategory = categoryRepository.save(existingCategory);

        refreshCategoryCache();

        return categoryMapper.toCategoryDTO(updatedCategory);
    }

}
