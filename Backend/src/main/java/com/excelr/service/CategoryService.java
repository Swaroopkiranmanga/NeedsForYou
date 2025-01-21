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

@Service
public class CategoryService {
	String status,message;
	@Autowired
    private S3Util s3Util;
	@Autowired
    private CategoryRepository categoriesRepo;
    public ResponseEntity<Map<String, Object>> getCategories() {
    	List<Category> category=  categoriesRepo.findAll();
    	Map <String,Object> response= new HashMap<>();
    	response.put("category", category);
    	return ResponseEntity.ok(response);
    }
    public ResponseEntity<?> getCategoryById(Long id) {
        Optional<Category> category= categoriesRepo.findById(id);
        if(category.isPresent()) {
        	Category categoryopt= category.get();
        	Map <String,Object> response= new HashMap<>();
        	response.put("category", categoryopt);
        	return ResponseEntity.ok(response);
        }else {
        	return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No resource available");
        }
    }
    public Category createCategory(Category category) {
        return categoriesRepo.save(category);
    }
    public ResponseEntity<?> updateCategory(Long id, Category updatedCategory, MultipartFile image) {
        Optional<Category> categoryopt = categoriesRepo.findById(id);
        if (categoryopt.isPresent() && image!=null) {
            Category category = categoryopt.get();
            String imageUrl = s3Util.uploadImage(image);
            category.setImage(imageUrl);
            category.setDescription(updatedCategory.getDescription());
            category.setName(updatedCategory.getName());
            categoriesRepo.save(category);
            Map<String, Object> response = new HashMap<>();
            response.put("category", categoriesRepo.findById(id).orElse(null));
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not Found");
        }
    }
    public ResponseEntity<?> deleteCategory(Long id) {
    	Optional<Category> cat= categoriesRepo.findById(id);
    	if(cat.isPresent()) {
    		categoriesRepo.deleteById(id);
    		return ResponseEntity.ok("deleted successfully");
    	}else {
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    	}
    }
    public ResponseEntity<?> addCategory(Category category,MultipartFile image){
    	Category cat= new Category();
    	String imageUrl = s3Util.uploadImage(image);
    	cat.setName(category.getName());
    	cat.setDescription(category.getDescription());
    	cat.setImage(imageUrl);
    	Category savedcategory=categoriesRepo.save(cat);
    	return ResponseEntity.ok("saved successfully");
    }
}
