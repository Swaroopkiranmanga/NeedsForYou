package com.excelr.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.excelr.model.Subcategory;
import com.excelr.repository.SubcategoryRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SubcategoryService {

    @Autowired
    SubcategoryRepository subCategoriesRepo;

    public ResponseEntity<?> getProductsBySubCategoryId(Long subcategoryId) {
        log.info("Fetching products for subcategory ID: {}", subcategoryId);
        Optional<Subcategory> subCategories = subCategoriesRepo.findById(subcategoryId);
        if (subCategories.isPresent()) {
            Subcategory subcategory = subCategories.get();
            Map<String, Object> response = new HashMap<>();
            response.put("subcategory", subcategory);
            log.info("Found subcategory for ID: {}", subcategoryId);
            return ResponseEntity.ok(response);
        } else {
            log.error("No subcategory found for ID: {}", subcategoryId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity<?> getSubCategories() {
        log.info("Fetching all subcategories");
        List<Subcategory> subcat = subCategoriesRepo.findAll();
        if (subcat.isEmpty()) {
            log.warn("No subcategories found");
        } else {
            log.info("Found {} subcategories", subcat.size());
        }
        Map<String, Object> res = new HashMap<>();
        res.put("Subcategory", subcat);
        return ResponseEntity.ok(res);
    }

    public ResponseEntity<?> getSubCategoriesById(Long id) {
        log.info("Fetching subcategory by ID: {}", id);
        Optional<Subcategory> subcat = subCategoriesRepo.findById(id);
        if (subcat.isPresent()) {
            Subcategory sub = subcat.get();
            Map<String, Object> res = new HashMap<>();
            res.put("SubCategory", sub);
            log.info("Found subcategory with ID: {}", id);
            return ResponseEntity.ok(res);
        } else {
            log.error("No subcategory found for ID: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity<?> createSubcategory(Subcategory subcategory) {
        log.info("Creating new subcategory with name: {}", subcategory.getName());
        Subcategory savedSubcategory = subCategoriesRepo.save(subcategory);
        log.info("Subcategory created successfully with ID: {}", savedSubcategory.getId());
        return ResponseEntity.ok("Saved successfully");
    }

    public ResponseEntity<?> updateSubcategory(Long id, Subcategory updatedSubcategory) {
        log.info("Updating subcategory with ID: {}", id);
        Optional<Subcategory> subcate = subCategoriesRepo.findById(id);
        if (subcate.isPresent()) {
            Subcategory subcategory = subcate.get();
            subcategory.setName(updatedSubcategory.getName());
            subcategory.setDescription(updatedSubcategory.getDescription());
            subcategory.setCategory(updatedSubcategory.getCategory());
            subCategoriesRepo.save(subcategory);
            log.info("Subcategory updated successfully with ID: {}", id);
            Map<String, String> res = new HashMap<>();
            res.put("message", "Updated successfully");
            return ResponseEntity.ok(res);
        } else {
            log.error("No subcategory found to update with ID: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity<?> deleteSubcategory(Long id) {
        log.info("Deleting subcategory with ID: {}", id);
        Optional<Subcategory> sub = subCategoriesRepo.findById(id);
        if (sub.isPresent()) {
            subCategoriesRepo.deleteById(id);
            log.info("Subcategory deleted successfully with ID: {}", id);
            return ResponseEntity.ok("Deleted successfully");
        } else {
            log.error("No subcategory found to delete with ID: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
