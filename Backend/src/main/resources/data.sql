--Insert into user table
INSERT INTO User (username, password, email, phoneNumber, role)
VALUES 
(1,'admin', 'admin@123', 'admin@123', NULL, 'ROLE_ADMIN'),
(2,'test', 'test@123', 'test@123', NULL, 'ROLE_USER');

-- Insert into categories table
INSERT INTO categories (id, description, image, name)
VALUES 
(1, 'Devices and gadgets', 'https://ecombackendbucket.s3.amazonaws.com/818df842-8512-4711-aa74-598269b0252d_electronics.jpg', 'Electronics'),
(2, 'Appliances for everyday use', 'https://ecombackendbucket.s3.amazonaws.com/72b02fb7-ad70-4d43-b2bd-5ccdc53ee5b7_HomeAppliance.jpg', 'Home Appliances'),
(3, 'Appliances for everyday use', 'https://ecombackendbucket.s3.amazonaws.com/c050ab3d-fa69-41e8-8f74-321169499e47_Books.jpg', 'Books');

-- Insert into subcategories table
INSERT INTO subcategories (id, description, name, category_id)
VALUES 
(1, 'Smartphones of various brands', 'Mobile Phones', 1),
(2, 'Portable computers for personal and professional use', 'Laptops', 1),
(3, 'Cooling appliances for homes', 'Refrigerators', 2),
(4, 'Microwave ovens for cooking and heating', 'Microwaves', 2),
(5, 'Fictional stories', 'Novels', 3),
(6, 'Educational books for students', 'Textbooks', 3);

-- Insert into products table
INSERT INTO products (id, brand, description, image, name, price, quantity, rating, subcategory_id)
VALUES 
(1, 'Apple', 'Latest Apple smartphone with advanced features', 'https://ecombackendbucket.s3.amazonaws.com/e26a7cbe-0fb4-4b06-8b0d-2cc8527877f3_iphone15.jpg', 'iPhone 14', 999.99, 50, 4.8, 1),
(2, 'Samsung', 'Flagship Samsung smartphone with great camera', 'https://ecombackendbucket.s3.amazonaws.com/68694a10-2f84-4aad-861d-6eaf7d928c57_samsungs24.jpg', 'Samsung Galaxy S23', 849.99, 30, 4.6, 1),
(3, 'Apple', 'High-performance laptop for professionals', 'https://ecombackendbucket.s3.amazonaws.com/d645dd6b-ec19-455b-9c21-56b066e5bcfb_Macbook.jpg', 'MacBook Pro 16', 2499.99, 15, 4.9, 2),
(4, 'Dell', 'Compact and powerful laptop for work and entertainment', 'https://ecombackendbucket.s3.amazonaws.com/c3d3211e-b867-457f-adde-8bcd97292558_dell2.jpg', 'Dell XPS 13', 1399.99, 20, 4.7, 2),
(5, 'LG', 'Energy-efficient refrigerator with smart cooling', 'https://ecombackendbucket.s3.amazonaws.com/f2cfcd23-69d0-4d79-8de7-c6abf3540844_refrigirator.jpg', 'LG Double Door Refrigerator', 1199.99, 10, 4.5, 3),
(6, 'Samsung', 'Microwave oven with smart cooking features', 'https://ecombackendbucket.s3.amazonaws.com/2d60decb-cf37-413d-9eb3-c5a1f03879e8_oven.jpg', 'Samsung Microwave Oven', 299.99, 25, 4.3, 4),
(7, 'HarperCollins', 'Classic novel by Harper Lee', 'https://ecombackendbucket.s3.amazonaws.com/4bc42f55-ba8b-471b-9ed3-a4317d470fd2_56916837.jpg', 'To Kill a Mockingbird', 14.99, 100, 4.8, 5),
(8, 'O\'Reilly Media', 'Educational textbook for Java developers', 'https://ecombackendbucket.s3.amazonaws.com/2ccb0dd0-a7f7-4592-82c2-6c484d3ad19d_Java_Programming_Cover.jpg', 'Java Programming: Comprehensive Guide', 59.99, 75, 4.7, 6),
(9, 'Apple', 'The latest Apple iPad with cutting-edge technology.', 'https://ecombackendbucket.s3.amazonaws.com/ee404888-2099-4a31-80d9-0c537b316762_download.jpg', 'iPad Air', 100000.99, 100, 4.5, 1),
(10, 'Google', 'Smartphone with exceptional camera and Google AI features', 'https://ecombackendbucket.s3.amazonaws.com/0f57a43e-54d8-4e9a-9adb-415a319e9b27_images.jpg', 'Google Pixel 8', 799.99, 45, 4.6, 1),
(11, 'OnePlus', 'High-performance smartphone with sleek design', 'https://ecombackendbucket.s3.amazonaws.com/60f51f9c-adad-492c-92f1-013ba864dd68_vivo.jpg', 'OnePlus 12', 699.99, 60, 4.5, 1),
(12, 'Xiaomi', 'Feature-packed smartphone at an affordable price', 'https://ecombackendbucket.s3.amazonaws.com/2caad8c0-1580-4715-b8bf-6c16c6e34bbc_vivov30.jpg', 'Xiaomi Mi 13', 649.99, 55, 4.4, 1),
(13, 'Sony', 'Compact smartphone with professional-grade camera', 'https://ecombackendbucket.s3.amazonaws.com/8682210d-20f9-49e0-b5bb-d8cb6bbeaf06_vivo1.jpg', 'Sony Xperia 5 V', 949.99, 30, 4.3, 1),
(14, 'Huawei', 'Stylish smartphone with cutting-edge photography features', 'https://ecombackendbucket.s3.amazonaws.com/e0060d8e-c731-4de5-ae87-e01a704646ba_vivov40.jpg4.jpeg', 'Huawei P60 Pro', 899.99, 40, 4.2, 1),
(15, 'Realme', 'Affordable smartphone with flagship features', 'https://ecombackendbucket.s3.amazonaws.com/ef6b4892-1d1d-4cd5-9b5e-a62a7d4199fb_vivo.jpg', 'Realme GT 5', 599.99, 75, 4.1, 1),
(16, 'Asus', 'Gaming smartphone with high-performance specs', 'https://ecombackendbucket.s3.amazonaws.com/2570582f-aaa7-4709-ab90-39825715bf50_images(1).jpg', 'Asus ROG Phone 7', 1099.99, 20, 4.9, 1),
(17, 'Motorola', 'Slim smartphone with impressive features and durability', 'https://ecombackendbucket.s3.amazonaws.com/b5dbe488-e361-4333-9cc2-3faa205ad046_715aoVxQNTL.jpg', 'Motorola Edge 40', 799.99, 65, 4, 1),
(18, 'Nokia', 'Reliable smartphone with a focus on sustainability', 'https://ecombackendbucket.s3.amazonaws.com/bef12b8d-75c4-4e7b-ac73-c5e74cf9f198_81w8JAmtd8L._AC_UF1000,1000_QL80_.jpg', 'Nokia G60', 499.99, 80, 3.9, 1),
(19, 'Vivo', 'Smartphone with advanced camera and display technology', 'https://ecombackendbucket.s3.amazonaws.com/798457b8-36b0-45ad-b638-3a32b1451c43_vivo1.jpg', 'Vivo X100', 749.99, 35, 4.4, 1),
(20, 'Oppo', 'Elegant smartphone with powerful performance', 'https://ecombackendbucket.s3.amazonaws.com/9f2bf180-0a23-42ae-8d47-da024f64fc52_Oppo-Find-X6_featured-image-packshot-review.jpg', 'Oppo Find X6', 849.99, 50, 4.5, 1),
(21, 'ZTE', 'Flagship smartphone with ultra-fast charging', 'https://ecombackendbucket.s3.amazonaws.com/3ce334c4-e46e-4c60-9b4c-e9683f23cb5d_Oppo-Find-X6_featured-image-packshot-review.jpg', 'ZTE Axon 50 Ultra', 899.99, 25, 4.6, 1),
(22, 'Lenovo', 'Gaming smartphone with exceptional performance', 'https://ecombackendbucket.s3.amazonaws.com/7a15ee65-2d8b-4a3c-ad53-234f52b351a3_lenovo.jpg', 'Lenovo Legion Phone Duel 3', 999.99, 15, 4.8, 1),
(23, 'Honor', 'Premium smartphone with innovative display technology', 'https://ecombackendbucket.s3.amazonaws.com/b018a01b-e025-4e1b-8a46-9f9f9a349073_Honor.jpg', 'Honor Magic 5 Pro', 949.99, 45, 4.3, 1);
