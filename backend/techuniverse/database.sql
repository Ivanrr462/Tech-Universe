DROP DATABASE IF EXISTS techstore;
CREATE DATABASE techstore;
USE techstore;

CREATE TABLE Categoria (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Usuario (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL, 
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Producto (
	id INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(250),
    stock INT, 
    precio FLOAT(10,2) NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id)
);

CREATE TABLE Cesta (
	id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    precio_total FLOAT(10,2),
    cantidad_total INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);

CREATE TABLE CestaProducto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cesta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario FLOAT(10,2) NOT NULL,
	FOREIGN KEY (id_cesta) REFERENCES Cesta(id),
    FOREIGN KEY (id_producto) REFERENCES Producto(id)
);

CREATE TABLE ListaDeseo (
	id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id),
    FOREIGN KEY (id_producto) REFERENCES Producto(id)
);

CREATE TABLE Fotos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    url VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES Producto(id)
);

-- Categorías
INSERT INTO Categoria (nombre) VALUES ('Smartphones');
INSERT INTO Categoria (nombre) VALUES ('Laptops');

-- Usuarios
INSERT INTO Usuario (nombre, contrasena, rol, correo) VALUES 
('Admin', 'admin123', 'admin', 'admin@techstore.com'),
('Juan Pérez', 'juan123', 'usuario', 'juanperez@gmail.com');

-- Productos
INSERT INTO Producto (id_categoria, nombre, descripcion, stock, precio) VALUES 
(1, 'iPhone 14', 'Smartphone de última generación', 15, 999.99),
(1, 'Samsung Galaxy S22', 'Pantalla AMOLED 120Hz', 20, 849.99),
(2, 'MacBook Air M2', 'Ultraliviana con chip M2', 10, 1199.99),
(2, 'Dell XPS 13', 'Laptop compacta con pantalla InfinityEdge', 8, 1099.99),
(1, 'Google Pixel 7 Pro', 'Cámara avanzada con IA', 12, 899.00),
(1, 'Xiaomi Mi 13', 'Procesador Snapdragon 8 Gen 2', 25, 699.99),
(1, 'OnePlus 11', 'Carga rápida 100W', 18, 749.99),
(1, 'Huawei P60 Pro', 'Zoom óptico 5x', 10, 899.99),
(1, 'Sony Xperia 1 V', 'Pantalla 4K HDR', 8, 1199.99),
(1, 'Oppo Find X6', 'Diseño premium con cristal', 14, 799.00),
(1, 'Motorola Edge 40', 'Pantalla curva 144Hz', 20, 599.99),
(1, 'Nokia G60', 'Batería de larga duración', 30, 349.99),
(2, 'HP Spectre x360', 'Convertible con pantalla táctil', 12, 1399.99),
(2, 'Lenovo ThinkPad X1', 'Ideal para negocios', 15, 1599.00),
(2, 'ASUS ROG Zephyrus', 'Gaming con RTX 4070', 7, 1899.99),
(2, 'Acer Swift 3', 'Portátil económico y ligero', 22, 699.00),
(2, 'Microsoft Surface Laptop 5', 'Pantalla PixelSense', 10, 1299.99),
(2, 'Razer Blade 15', 'Gaming premium con RGB', 5, 2199.99),
(2, 'MSI Prestige 14', 'Creadores de contenido', 9, 1149.00),
(2, 'LG Gram 17', 'Ultraligero de 17 pulgadas', 11, 1599.99),
(2, 'Samsung Galaxy Book3', 'Integración con Galaxy', 13, 999.00),
(2, 'Huawei MateBook X Pro', 'Pantalla táctil 3K', 8, 1499.99),
(1, 'Realme GT 3', 'Relación calidad-precio', 28, 499.99),
(1, 'Vivo X90 Pro', 'Lentes Zeiss', 16, 849.00);
