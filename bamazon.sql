DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '*InuYasha10';

CREATE TABLE products(
item_id INTEGER (11) NOT NULL AUTO_INCREMENT,
PRIMARY KEY (item_id),
product_name VARCHAR(100),
department_name VARCHAR(20),
price INTEGER(11),
stock_quantity INTEGER(11)
);

SELECT stock_quantity FROM products WHERE item_id = '8';

SELECT * FROM products;

/*--Creates new rows*/
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kingston USB 32GB", "Tecnología", 199.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gowin Audífonos RHEM", "Tecnología", 250.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Steren Soporte Universal", "Tecnología", 300.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Unirex USB 8GB", "Tecnología", 120.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mobo Mini Selfie", "Tecnología", 200.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hyundai USB 2.0 8GB", "Tecnología", 150.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mobo PortaTeléfono", "Tecnología", 350.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gowin Cable Auxiliar 3.5", "Tecnología", 50.00, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kingston USB 16GB", "Tecnología", 210.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Maxcell Micro SD 8GB", "Tecnología", 180.00, 3);

