package com.excelr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.excelr.model.Subcategory;
@Repository
public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {
	
	Optional<Subcategory>findByName(String name);

}
