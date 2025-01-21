package com.excelr.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.excelr.model.Category;
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {


}
