package vn.edu.iuh.fit.climpingrose.controllers;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.PaintingDTO;
import vn.edu.iuh.fit.climpingrose.dtos.responses.ApiResponse;
import vn.edu.iuh.fit.climpingrose.services.PaintingService;

import java.util.List;

@RestController
@RequestMapping("/api/paintings")
@AllArgsConstructor
public class PaintingController {

    private final PaintingService paintingService;

    @GetMapping
    public ApiResponse<List<PaintingDTO>> getAllPaintings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        List<PaintingDTO> result = paintingService.getAllPaintings(page, size);
        return ApiResponse.<List<PaintingDTO>>builder()
                .message("Lấy danh sách tranh thành công")
                .data(result)
                .build();
    }
}
