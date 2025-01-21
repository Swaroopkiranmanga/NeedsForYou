package com.excelr.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.excelr.model.Product;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	
	Page<Product> findBySubcategoryId(Long subcategoryId, Pageable pageable);
	
	Page<Product> findAll(Pageable pageable);
	
	@Query("SELECT p FROM Product p " +
		       "LEFT JOIN p.subcategory s " +
		       "LEFT JOIN s.category c " +
		       "WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
		       "OR LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
		       "OR LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
		List<Product> searchProducts(String keyword);
}