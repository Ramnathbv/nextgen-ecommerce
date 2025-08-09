USE `nextgen_commerce`;

-- Seed users (passwords are bcrypt hashes of "password123")
INSERT INTO `users` (`name`, `email`, `password`, `created_at`, `updated_at`, `last_login`) VALUES
('Alice Johnson', 'alice@example.com', '$2a$10$y2/VZ2kq7CwQzQh.5Qm2X.H7YwQ7cU3KfXzN0m4m8xQj9h2NwJ7q2', NOW(), NOW(), NULL),
('Bob Smith', 'bob@example.com', '$2a$10$y2/VZ2kq7CwQzQh.5Qm2X.H7YwQ7cU3KfXzN0m4m8xQj9h2NwJ7q2', NOW(), NOW(), NULL),
('Carol White', 'carol@example.com', '$2a$10$y2/VZ2kq7CwQzQh.5Qm2X.H7YwQ7cU3KfXzN0m4m8xQj9h2NwJ7q2', NOW(), NOW(), NULL),
('David Brown', 'david@example.com', '$2a$10$y2/VZ2kq7CwQzQh.5Qm2X.H7YwQ7cU3KfXzN0m4m8xQj9h2NwJ7q2', NOW(), NOW(), NULL),
('Eve Black', 'eve@example.com', '$2a$10$y2/VZ2kq7CwQzQh.5Qm2X.H7YwQ7cU3KfXzN0m4m8xQj9h2NwJ7q2', NOW(), NOW(), NULL),
('Frank Green', 'frank@example.com', '$2a$10$y2/VZ2kq7CwQzQh.5Qm2X.H7YwQ7cU3KfXzN0m4m8xQj9h2NwJ7q2', NOW(), NOW(), NULL),
('Grace Lee', 'grace@example.com', '$2a$10$y2/VZ2kq7CwQzQh.5Qm2X.H7YwQ7cU3KfXzN0m4m8xQj9h2NwJ7q2', NOW(), NOW(), NULL),
('Henry Adams', 'henry@example.com', '$2a$10$y2/VZ2kq7CwQzQh.5Qm2X.H7YwQ7cU3KfXzN0m4m8xQj9h2NwJ7q2', NOW(), NOW(), NULL),
('Ivy Wilson', 'ivy@example.com', '$2a$10$y2/VZ2kq7CwQzQh.5Qm2X.H7YwQ7cU3KfXzN0m4m8xQj9h2NwJ7q2', NOW(), NOW(), NULL),
('Jack Miller', 'jack@example.com', '$2a$10$y2/VZ2kq7CwQzQh.5Qm2X.H7YwQ7cU3KfXzN0m4m8xQj9h2NwJ7q2', NOW(), NOW(), NULL);

-- Seed products
INSERT INTO `products` (`name`, `sku`, `image`, `desc`, `category`, `inventory`, `labels`, `created_at`, `updated_at`) VALUES
('Wireless Mouse', 'SKU-0001', 'https://example.com/img/mouse.jpg', 'Ergonomic wireless mouse', 'Accessories', 150, JSON_ARRAY('new','tech'), NOW(), NOW()),
('Mechanical Keyboard', 'SKU-0002', 'https://example.com/img/keyboard.jpg', 'RGB mechanical keyboard', 'Accessories', 80, JSON_ARRAY('bestseller'), NOW(), NOW()),
('USB-C Hub', 'SKU-0003', 'https://example.com/img/hub.jpg', '7-in-1 USB-C hub', 'Adapters', 200, JSON_ARRAY('deal'), NOW(), NOW()),
('27" Monitor', 'SKU-0004', 'https://example.com/img/monitor.jpg', '4K UHD monitor', 'Displays', 40, JSON_ARRAY('premium'), NOW(), NOW()),
('Laptop Sleeve', 'SKU-0005', 'https://example.com/img/sleeve.jpg', 'Protective 13" sleeve', 'Bags', 120, JSON_ARRAY(), NOW(), NOW()),
('Noise Cancelling Headphones', 'SKU-0006', 'https://example.com/img/headphones.jpg', 'Over-ear ANC headphones', 'Audio', 60, JSON_ARRAY('audio','premium'), NOW(), NOW()),
('Webcam', 'SKU-0007', 'https://example.com/img/webcam.jpg', '1080p streaming webcam', 'Cameras', 90, JSON_ARRAY('new'), NOW(), NOW()),
('Portable SSD 1TB', 'SKU-0008', 'https://example.com/img/ssd.jpg', 'USB-C external SSD', 'Storage', 70, JSON_ARRAY('deal'), NOW(), NOW()),
('Smartphone Stand', 'SKU-0009', 'https://example.com/img/stand.jpg', 'Adjustable phone stand', 'Accessories', 300, JSON_ARRAY(), NOW(), NOW()),
('Desk Lamp', 'SKU-0010', 'https://example.com/img/lamp.jpg', 'LED desk lamp with USB', 'Home Office', 110, JSON_ARRAY('home'), NOW(), NOW());

-- Seed carts (one cart per first 10 users)
INSERT INTO `cart` (`user_id`, `item_qty`, `total_price`, `selleable_price`, `netpayable`, `coupon_code`, `created_at`, `updated_at`) VALUES
(1, 2, 120.00, 100.00, 95.00, 'WELCOME5', NOW(), NOW()),
(2, 1, 59.99, 59.99, 59.99, NULL, NOW(), NOW()),
(3, 3, 299.97, 270.00, 250.00, 'SAVE20', NOW(), NOW()),
(4, 2, 199.98, 180.00, 180.00, NULL, NOW(), NOW()),
(5, 4, 399.96, 360.00, 330.00, 'BULK70', NOW(), NOW()),
(6, 1, 89.99, 79.99, 79.99, NULL, NOW(), NOW()),
(7, 5, 499.95, 450.00, 400.00, 'MEGA100', NOW(), NOW()),
(8, 2, 139.98, 120.00, 118.00, 'SAVE2', NOW(), NOW()),
(9, 1, 19.99, 19.99, 19.99, NULL, NOW(), NOW()),
(10, 2, 59.98, 50.00, 45.00, 'WELCOME5', NOW(), NOW());

-- Seed cart items (products 1..10 mapped into carts 1..10 with varying quantities/prices)
INSERT INTO `cart_item` (`cart_id`, `product_id`, `price`, `final_price`, `selleable_price`, `coupon_value`, `created_at`, `updated_at`) VALUES
(1, 1, 60.00, 50.00, 50.00, 5.00, NOW(), NOW()),
(1, 2, 60.00, 45.00, 50.00, 5.00, NOW(), NOW()),
(2, 3, 59.99, 59.99, 59.99, NULL, NOW(), NOW()),
(3, 4, 149.99, 130.00, 135.00, 10.00, NOW(), NOW()),
(3, 5, 99.99, 90.00, 90.00, 5.00, NOW(), NOW()),
(3, 6, 49.99, 30.00, 45.00, 15.00, NOW(), NOW()),
(4, 7, 99.99, 90.00, 90.00, NULL, NOW(), NOW()),
(4, 8, 99.99, 90.00, 90.00, NULL, NOW(), NOW()),
(5, 9, 99.99, 80.00, 90.00, 10.00, NOW(), NOW()),
(5, 10, 299.99, 250.00, 270.00, 20.00, NOW(), NOW());


