package com.excelr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.excelr.model.Category;
import com.excelr.service.CategoryService;

@RestController
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	@GetMapping("/api/get/categories")
	public ResponseEntity<?> categoriesAndSubCategories(){
		return categoryService.getCategories();
	}
	@GetMapping("/api/category/{id}")
	public ResponseEntity<?> singleCategory(@PathVariable Long id) {
		return categoryService.getCategoryById(id);
	}
	@PutMapping(value = "/api/category/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestPart Category category,@RequestPart("image") MultipartFile image) {
        return categoryService.updateCategory(id, category,image);
    }
    @DeleteMapping("/api/category/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        return categoryService.deleteCategory(id);
    }
    @PostMapping(value = "api/category", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addCategory(@RequestPart Category category,@RequestPart("image") MultipartFile image) {
        return categoryService.addCategory(category,image);
    }
}
