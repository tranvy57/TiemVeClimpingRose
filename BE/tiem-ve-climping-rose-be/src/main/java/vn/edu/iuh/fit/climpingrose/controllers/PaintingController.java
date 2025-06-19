package vn.edu.iuh.fit.climpingrose.controllers;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.PaintingDTO;
import vn.edu.iuh.fit.climpingrose.dtos.responses.ApiResponse;
import vn.edu.iuh.fit.climpingrose.dtos.responses.PageResponse;
import vn.edu.iuh.fit.climpingrose.services.PaintingService;

import java.util.List;

@RestController
@RequestMapping("/api/paintings")
@AllArgsConstructor
public class PaintingController {

    private final PaintingService paintingService;

    @GetMapping
    public ApiResponse<PageResponse<PaintingDTO>> getAllPaintings(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) List<String> categoryIds,
            @RequestParam(required = false) List<String> sizes,
            @RequestParam(required = false) Boolean isActive,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String sort
    ) {
        PageResponse<PaintingDTO> result = paintingService.getAllPaintings(page, size, categoryIds, sizes, isActive, keyword, sort) ;
        return ApiResponse.<PageResponse<PaintingDTO>>builder()
                .message("Lấy danh sách tranh thành công")
                .data(result)
                .build();
    }

    @GetMapping("{paintingId}")
    public ApiResponse<PaintingDTO> getPaintingById(@PathVariable("paintingId") String paintingId) {
        PaintingDTO painting = paintingService.getPaintingById(paintingId);
        return ApiResponse.<PaintingDTO>builder()
                .message("Lấy thông tin tranh thành công")
                .data(painting)
                .build();
    }

}
