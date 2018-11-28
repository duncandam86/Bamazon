-- make sure bamazon database does not exist --
DROP DATABASE IF EXISTS bamazon;

-- create database bamazon --
CREATE database bamazon;

-- use the bamazon -- 
USE bamazon;

-- create a table called products
CREATE TABLE products(
  item_id INT auto_increment not null primary key,
  product_name VARCHAR(200) not null,
  department_name varchar(200) not null,
  price Decimal(10,2) not null,
  stock_quantity INT(10) not null
  
);

-- insert data into the table --
Insert into products (product_name, department_name, price, stock_quantity) 

Values("Shampoo", "Health and Beauty", 14.99, 250),
("Shower Gel", "Health and Beauty", 13.29, 125),
("Tooth Brush", "Health and Beauty", 3.99, 500),
("Candy Cane", "Grocery", 4.99, 100),
("Cough Drop", "Pharmacy", 5.99, 300),
("Bread", "Grocery", 2.99, 150),
("Milk", "Grocery", 4.99, 250),
("Beer", "Liquor", 14.99 , 300),
("Tshirt", "Clothing", 9.99, 200),
("Sock", "Clothing", 4.99, 250),
("Dog food", "Pet", 18.29, 27);


