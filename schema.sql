DROP DATABASE IF EXISTS bamazon_db;

CREATE database bamazon_db;

USE bamazon_db;



CREATE TABLE products (
id INT(4) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(40) NOT NULL,
deparment_id VARCHAR (40) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT (20) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products 
(product_name, department_id, price, stock_quantity)

VALUES
  ("iPhone", "Electronic", 900, 10),
  ("Adidas Ultra Boost", "Apparel", 250, 5),
  ("Yeezy 350", "Apparel", 500, 3),
  ("GoPro", "Electronic", 399.99, 8),
  ("Headphones", "Entertaient", 19.99, 50),
  ("Sunglasses", "Apparel", 120.99, 20),
  ("Nintendo Switch", "Entertaiment", 299.99, 15),
  ("Shampoo","Personal Care", 9.99, 20),
  ("Body Wash","Personal Care", 8.99, 15),
  ("Soccer Ball", "Sports", 19.99, 20),
  ("Tennis Racket", "Sports", 25.99, 25)


