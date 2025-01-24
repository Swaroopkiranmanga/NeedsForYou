package com.excelr.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.excelr.model.Product;
import com.excelr.model.Productdto;
import com.excelr.model.Subcategory;
import com.excelr.repository.ProductRepository;
import com.excelr.repository.SubcategoryRepository;
import com.excelr.util.S3Util;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final SubcategoryRepository subcategoryRepository;

    @Autowired
    private S3Util s3Util;

    public ProductService(ProductRepository productRepository, SubcategoryRepository subcategoryRepository) {
        this.productRepository = productRepository;
        this.subcategoryRepository = subcategoryRepository;
    }

    public Page<Productdto> getProductsBySubcategory(Long subcategoryId, Pageable pageable) {
        log.info("Fetching products for subcategory ID: {}", subcategoryId);
        return productRepository.findBySubcategoryId(subcategoryId, pageable)
                .map(this::mapProductToProductDTO);
    }

    public Page<Productdto> getProducts(Pageable pageable) {
        log.info("Fetching paginated list of all products.");
        return productRepository.findAll(pageable)
                .map(this::mapProductToProductDTO);
    }

    public Productdto getProductById(long id) {
        log.info("Fetching product with ID: {}", id);
        Product product = productRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Product not found with ID: {}", id);
                    return new RuntimeException("Product not found");
                });
        return mapProductToProductDTO(product);
    }

    public Productdto createProduct(Productdto productDto, MultipartFile image) {
        log.info("Creating product: {}", productDto.getName());
        Subcategory subcategory = subcategoryRepository.findByName(productDto.getSubcategoryName())
                .orElseThrow(() -> {
                    log.error("Subcategory not found: {}", productDto.getSubcategoryName());
                    return new RuntimeException("Subcategory not found with name: " + productDto.getSubcategoryName());
                });

        String imageUrl = s3Util.uploadImage(image);
        log.info("Image uploaded successfully. URL: {}", imageUrl);

        Product product = new Product();
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setDescription(productDto.getDescription());
        product.setBrand(productDto.getBrand());
        product.setImage(imageUrl);
        product.setRating(productDto.getRating());
        product.setQuantity(productDto.getQuantity());
        product.setSubcategory(subcategory);

        Product savedProduct = productRepository.save(product);
        log.info("Product created successfully with ID: {}", savedProduct.getId());
        return mapProductToProductDTO(savedProduct);
    }

    public Productdto updateProduct(long id, Productdto productDto, MultipartFile image) {
        log.info("Updating product with ID: {}", id);
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Product not found with ID: {}", id);
                    return new RuntimeException("Product not found");
                });

        Subcategory subcategory = null;
        if (productDto.getSubcategoryName() != null) {
            subcategory = subcategoryRepository.findByName(productDto.getSubcategoryName())
                    .orElseThrow(() -> {
                        log.error("Subcategory not found: {}", productDto.getSubcategoryName());
                        return new RuntimeException("Subcategory not found with name: " + productDto.getSubcategoryName());
                    });
        }

        String imageUrl = existingProduct.getImage();
        if (image != null && !image.isEmpty()) {
            try {
                imageUrl = s3Util.updateImage(existingProduct.getImage(), image);
                log.info("Image updated successfully. New URL: {}", imageUrl);
            } catch (Exception e) {
                log.error("Failed to update product image: {}", e.getMessage());
                throw new RuntimeException("Failed to update product image: " + e.getMessage());
            }
        }

        existingProduct.setName(productDto.getName() != null ? productDto.getName() : existingProduct.getName());
        existingProduct.setPrice(productDto.getPrice() != 0 ? productDto.getPrice() : existingProduct.getPrice());
        existingProduct.setDescription(productDto.getDescription() != null ? productDto.getDescription() : existingProduct.getDescription());
        existingProduct.setBrand(productDto.getBrand() != null ? productDto.getBrand() : existingProduct.getBrand());
        existingProduct.setImage(imageUrl);
        existingProduct.setRating(productDto.getRating() != null ? productDto.getRating() : existingProduct.getRating());
        existingProduct.setQuantity(productDto.getQuantity() != null ? productDto.getQuantity() : existingProduct.getQuantity());

        if (subcategory != null) {
            existingProduct.setSubcategory(subcategory);
        }

        Product updatedProduct = productRepository.save(existingProduct);
        log.info("Product updated successfully with ID: {}", id);
        return mapProductToProductDTO(updatedProduct);
    }

    public void deleteProduct(long id) {
        log.info("Deleting product with ID: {}", id);
        Product product = productRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Product not found with ID: {}", id);
                    return new RuntimeException("Product not found");
                });

        try {
            if (product.getImage() != null) {
                s3Util.deleteImage(product.getImage());
                log.info("Image deleted successfully from S3 for product ID: {}", id);
            }
        } catch (Exception e) {
            log.error("Failed to delete image from S3 for product ID: {}. Error: {}", id, e.getMessage());
        }

        productRepository.delete(product);
        log.info("Product deleted successfully with ID: {}", id);
    }

    public List<Productdto> searchProducts(String keyword) {
        log.info("Searching products with keyword: {}", keyword);
        List<Product> products = productRepository.searchProducts(keyword);
        return products.stream()
                .map(this::mapProductToProductDTO)
                .collect(Collectors.toList());
    }

    public ByteArrayInputStream exportProductsToExcel() {
        log.info("Exporting products to Excel.");
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Products List");

            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("ID");
            headerRow.createCell(1).setCellValue("Name");
            headerRow.createCell(2).setCellValue("Price");
            headerRow.createCell(3).setCellValue("Description");
            headerRow.createCell(4).setCellValue("Brand");
            headerRow.createCell(5).setCellValue("Rating");
            headerRow.createCell(6).setCellValue("Quantity");
            headerRow.createCell(7).setCellValue("Subcategory");

            List<Product> products = productRepository.findAll();

            int rowNum = 1;
            for (Product product : products) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(product.getId());
                row.createCell(1).setCellValue(product.getName());
                row.createCell(2).setCellValue(product.getPrice());
                row.createCell(3).setCellValue(product.getDescription());
                row.createCell(4).setCellValue(product.getBrand());
                row.createCell(5).setCellValue(product.getRating());
                row.createCell(6).setCellValue(product.getQuantity());
                row.createCell(7).setCellValue(product.getSubcategory() != null ?
                        product.getSubcategory().getName() : "");
            }
            for (int i = 0; i < 8; i++) {
                sheet.autoSizeColumn(i);
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            log.info("Excel export completed successfully.");
            return new ByteArrayInputStream(outputStream.toByteArray());
        } catch (IOException e) {
            log.error("Failed to export products to Excel: {}", e.getMessage());
            throw new RuntimeException("Failed to export products to Excel: " + e.getMessage());
        }
    }

    private Productdto mapProductToProductDTO(Product product) {
        return new Productdto(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getDescription(),
                product.getSubcategory() != null ? product.getSubcategory().getName() : null,
                product.getBrand(),
                product.getImage(),
                product.getRating(),
                product.getQuantity()
        );
    }
}
