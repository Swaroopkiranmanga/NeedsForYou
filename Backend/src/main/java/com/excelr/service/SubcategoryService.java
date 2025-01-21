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

@Service
public class SubcategoryService {
	@Autowired
	SubcategoryRepository  subCategoriesRepo;
	public ResponseEntity<?> getProductsBySubCategoryId(Long subcategoryId){
		Optional<Subcategory> subCategories=subCategoriesRepo.findById(subcategoryId);
		if(subCategories.isPresent()) {
			Subcategory subcategory=subCategories.get();
			Map<String,Object> response=new HashMap<>();
		return ResponseEntity.ok(response.put("subcategory", subcategory));
		}else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
	public  ResponseEntity<?> getSubCategories(){
		List<Subcategory> subcat= subCategoriesRepo.findAll();
		Map<String, Object> res=new HashMap<>();
		res.put("Subcategory", subcat);
		return ResponseEntity.ok(res);
	}
	public ResponseEntity<?> getSubCategoriesById(Long id) {
        Optional<Subcategory> subcat= subCategoriesRepo.findById(id);
        if(subcat.isPresent()) {
        	Subcategory sub= subcat.get();
        	Map<String, Object> res= new HashMap<>();
        	res.put("SubCategory", sub);
        	return ResponseEntity.ok(res);
        }else {
        	return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
	public ResponseEntity<?> createSubcategory(Subcategory subcategory) {
         subCategoriesRepo.save(subcategory);
         return ResponseEntity.ok("saved successfully");
    }
	public ResponseEntity<?> updateSubcategory(Long id, Subcategory updatedSubcategory) {
	    Optional<Subcategory> subcate = subCategoriesRepo.findById(id);
	    if (subcate.isPresent()) {
	        Subcategory subcategory = subcate.get();
	        subcategory.setName(updatedSubcategory.getName()); 
	        subcategory.setDescription(updatedSubcategory.getDescription()); 
	        subcategory.setCategory(updatedSubcategory.getCategory());
	        subCategoriesRepo.save(subcategory);
	        Map<String, String> res = new HashMap<>();
	        res.put("message", "updated successfully");
	        return ResponseEntity.ok(res);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	    }
	}
    public ResponseEntity<?> deleteSubcategory(Long id) {
    	Optional<Subcategory> sub=subCategoriesRepo.findById(id);
    	if(sub.isPresent()) {
    	subCategoriesRepo.deleteById(id);
    	return ResponseEntity.ok("deleted successfully");
    	}else {
    	return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    	}
    }
}
