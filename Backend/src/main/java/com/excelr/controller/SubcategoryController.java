package com.excelr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.excelr.model.Subcategory;
import com.excelr.service.SubcategoryService;

@RestController
public class SubcategoryController {
	@Autowired
	SubcategoryService subCategoryService;
	@GetMapping("/api/subcategory")
	public ResponseEntity<?> produtsBySubCtegoryId(){
		return subCategoryService.getSubCategories();
	}
	@PostMapping("/api/subcategory")
	public ResponseEntity<?> saveSubCategory(@RequestBody Subcategory sub){
		return subCategoryService.createSubcategory(sub);
	}
	@GetMapping("/api/subcategory{id}")
	public ResponseEntity<?> subCategoryById(@PathVariable Long id) {
		return subCategoryService.getSubCategoriesById(id);
	}
	@PutMapping("/api/subcategory{id}")
    public ResponseEntity<?> updateSubcategory(@PathVariable Long id, @RequestBody Subcategory subcategory) {
        return subCategoryService.updateSubcategory(id, subcategory);
    }
    @DeleteMapping("/api/subcategory{id}")
    public ResponseEntity<?> deleteSubcategory(@PathVariable Long id) {
        return subCategoryService.deleteSubcategory(id);
    }
}

