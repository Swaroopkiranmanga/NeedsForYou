package com.excelr.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Productdto {
	private Long id;
    private String name;
    private double price;
    private String description;
    private String subcategoryName;
    private String brand;
    private String image;
    private Float rating;
    private Integer quantity;
}
