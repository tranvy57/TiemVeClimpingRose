package vn.edu.iuh.fit.climpingrose.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.PaintingResponse;
import vn.edu.iuh.fit.climpingrose.dtos.requests.PaintingCreationRequest;
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
    public ApiResponse<PageResponse<PaintingResponse>> getAllPaintings(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) List<String> categoryIds,
            @RequestParam(required = false) List<String> sizes,
            @RequestParam(required = false) Boolean isActive,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String sort
    ) {
        PageResponse<PaintingResponse> result = paintingService.getAllPaintings(page, size, categoryIds, sizes, isActive, keyword, sort) ;
        return ApiResponse.<PageResponse<PaintingResponse>>builder()
                .message("Lấy danh sách tranh thành công")
                .data(result)
                .build();
    }

    @GetMapping("{paintingId}")
    public ApiResponse<PaintingResponse> getPaintingById(@PathVariable("paintingId") String paintingId) {
        PaintingResponse painting = paintingService.getPaintingById(paintingId);
        return ApiResponse.<PaintingResponse>builder()
                .message("Lấy thông tin tranh thành công")
                .data(painting)
                .build();
    }

    @PostMapping("/create")
    public ApiResponse<PaintingResponse> createPainting(@RequestBody PaintingCreationRequest request) {
        PaintingResponse painting = paintingService.createPainting(request);
        return ApiResponse.<PaintingResponse>builder()
                .message("Tạo tranh thành công")
                .data(painting)
                .build();
    }

}
