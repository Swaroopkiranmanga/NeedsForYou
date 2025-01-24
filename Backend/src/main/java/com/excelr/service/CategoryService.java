package com.excelr.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.excelr.model.Category;
import com.excelr.repository.CategoryRepository;
import com.excelr.util.S3Util;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CategoryService {
    @Autowired
    private S3Util s3Util;

    @Autowired
    private CategoryRepository categoriesRepo;

    public ResponseEntity<Map<String, Object>> getCategories() {
        log.info("Fetching all categories.");
        List<Category> category = categoriesRepo.findAll();
        Map<String, Object> response = new HashMap<>();
        response.put("category", category);
        log.info("Successfully fetched {} categories.", category.size());
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> getCategoryById(Long id) {
        log.info("Fetching category with ID: {}", id);
        Optional<Category> category = categoriesRepo.findById(id);
        if (category.isPresent()) {
            log.info("Category found with ID: {}", id);
            Map<String, Object> response = new HashMap<>();
            response.put("category", category.get());
            return ResponseEntity.ok(response);
        } else {
            log.error("Category not found with ID: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No resource available");
        }
    }

    public Category createCategory(Category category) {
        log.info("Creating a new category with name: {}", category.getName());
        Category savedCategory = categoriesRepo.save(category);
        log.info("Category created successfully with ID: {}", savedCategory.getId());
        return savedCategory;
    }

    public ResponseEntity<?> updateCategory(Long id, Category updatedCategory, MultipartFile image) {
        log.info("Updating category with ID: {}", id);
        Optional<Category> categoryopt = categoriesRepo.findById(id);
        if (categoryopt.isPresent() && image != null) {
            Category category = categoryopt.get();
            log.info("Category found with ID: {}. Updating details.", id);
            String imageUrl = s3Util.uploadImage(image);
            log.info("Image uploaded successfully. URL: {}", imageUrl);

            category.setImage(imageUrl);
            category.setDescription(updatedCategory.getDescription());
            category.setName(updatedCategory.getName());
            categoriesRepo.save(category);

            Map<String, Object> response = new HashMap<>();
            response.put("category", categoriesRepo.findById(id).orElse(null));
            log.info("Category updated successfully with ID: {}", id);
            return ResponseEntity.ok(response);
        } else {
            log.error("Category not found with ID: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not Found");
        }
    }

    public ResponseEntity<?> deleteCategory(Long id) {
        log.info("Deleting category with ID: {}", id);
        Optional<Category> cat = categoriesRepo.findById(id);
        if (cat.isPresent()) {
            categoriesRepo.deleteById(id);
            log.info("Category deleted successfully with ID: {}", id);
            return ResponseEntity.ok("Deleted successfully");
        } else {
            log.error("Category not found with ID: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity<?> addCategory(Category category, MultipartFile image) {
        log.info("Adding a new category with name: {}", category.getName());
        Category cat = new Category();
        String imageUrl = s3Util.uploadImage(image);
        log.info("Image uploaded successfully for new category. URL: {}", imageUrl);

        cat.setName(category.getName());
        cat.setDescription(category.getDescription());
        cat.setImage(imageUrl);
        Category savedCategory = categoriesRepo.save(cat);
        log.info("Category added successfully with ID: {}", savedCategory.getId());
        return ResponseEntity.ok("Saved successfully");
    }
}