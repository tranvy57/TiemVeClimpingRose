package vn.edu.iuh.fit.climpingrose.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.iuh.fit.climpingrose.dtos.responses.ApiResponse;
import vn.edu.iuh.fit.climpingrose.services.CloudinaryService;

import java.io.IOException;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {
    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("/upload/image")
    public ApiResponse<?> uploadImage(
            @RequestParam("file") MultipartFile file, @RequestParam(name = "folder", defaultValue = "") String folderName )
            throws IOException, IOException {
        return ApiResponse.builder()
                .message("Upload ảnh thành công.")
                .data(cloudinaryService.uploadFile(file, folderName))
                .build();
    }

//    @PostMapping("/upload/video")
//    public ResponseEntity<?> uploadVideo(
//            @RequestParam("file") MultipartFile file, @RequestParam("folder") String folderName) throws IOException {
//        return ResponseEntity.ok(cloudinaryService.uploadVideo(file, folderName));
//    }
}
