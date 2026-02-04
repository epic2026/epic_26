package com.contact.service.helper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Set;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final String UPLOAD_DIR = "";

    // IMAGE MIME TYPES ONLY
    private static final Set<String> ALLOWED_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp"
    );

    public String storeImage(MultipartFile file) {

        // Empty check
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        // MIME type check
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Only image files are allowed");
        }

        // Size check (10MB)
        if (file.getSize() > 10_000_000) {
            throw new IllegalArgumentException("Image size exceeds 10MB");
        }

        try {
            // Create folder if not exists
            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // Safe unique name
            String extension = getExtension(file.getOriginalFilename());
            String fileName = UUID.randomUUID() + extension;

            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.copy(file.getInputStream(), path);

            return path.toString();

        } catch (Exception e) {
            throw new RuntimeException("Image upload failed", e);
        }
    }

    private String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }
}
