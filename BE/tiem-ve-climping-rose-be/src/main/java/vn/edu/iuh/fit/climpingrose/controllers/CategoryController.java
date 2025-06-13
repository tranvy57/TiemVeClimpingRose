package vn.edu.iuh.fit.climpingrose.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.CategoryDTO;
import vn.edu.iuh.fit.climpingrose.dtos.responses.ApiResponse;
import vn.edu.iuh.fit.climpingrose.repositories.CategoryRepository;
import vn.edu.iuh.fit.climpingrose.services.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    @GetMapping
    public ApiResponse<List<CategoryDTO>> findAll() {
        return ApiResponse.<List<CategoryDTO>>builder()
                .message("Lấy danh sách thể loại thành công")
                .data(categoryService.getAllCategories())
                .build();
    }
}
