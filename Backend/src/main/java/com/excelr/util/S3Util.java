package com.excelr.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class S3Util {
    
    @Autowired
    private S3Client s3Client;
    
    @Value("${aws.s3.bucket.name}")
    private String bucketName;
    
    // Maximum file size: 5MB
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;
    
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(
            ".jpg", ".jpeg", ".png"
    );
    
    public String uploadImage(MultipartFile file) {
        validateFile(file);
        
        try {
            String originalFilename = file.getOriginalFilename();
            String sanitizedFilename = originalFilename.replace(" ", "");
            String fileName = UUID.randomUUID() + "_" + sanitizedFilename;
            
            // Determine content type
            String contentType = file.getContentType();
            if (contentType == null) {
                contentType = originalFilename.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
            }
            
            // Upload to S3
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType(contentType)
                .build();
                
            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));
            
            // Generate and return the S3 URL
            return String.format("https://%s.s3.amazonaws.com/%s", bucketName, fileName);
            
        } catch (IOException e) {
            throw new RuntimeException("Error uploading file to S3: " + e.getMessage());
        }
    }
    
    public void deleteImage(String imageUrl) {
        if (imageUrl == null || !imageUrl.contains(bucketName)) {
            return;
        }
        
        try {
            String key = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
            
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
                
            s3Client.deleteObject(deleteObjectRequest);
            
        } catch (Exception e) {
            throw new RuntimeException("Error deleting file from S3: " + e.getMessage());
        }
    }
    
    public String updateImage(String existingImageUrl, MultipartFile newImage) {
        validateFile(newImage);
        
        // Delete existing image if present
        if (existingImageUrl != null) {
            deleteImage(existingImageUrl);
        }
        
        // Upload new image
        return uploadImage(newImage);
    }
    
    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }
        
        // Check file size
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File too large. Max size is 5MB");
        }
        
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !isValidFileType(originalFilename)) {
            throw new IllegalArgumentException("Unsupported file type. Allowed types: jpg, jpeg, png");
        }
        
        // Validate that it's actually an image
        try {
            BufferedImage bufferedImage = ImageIO.read(file.getInputStream());
            if (bufferedImage == null) {
                throw new IllegalArgumentException("Invalid image file");
            }
        } catch (IOException e) {
            throw new IllegalArgumentException("Error processing image file");
        }
    }
    
    private boolean isValidFileType(String filename) {
        return ALLOWED_EXTENSIONS.stream()
                .anyMatch(ext -> filename.toLowerCase().endsWith(ext));
    }
}