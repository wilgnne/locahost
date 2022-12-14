CREATE TABLE address(
    id INT PRIMARY KEY AUTO_INCREMENT,
    street VARCHAR(20) NOT NULL,
    address_number INT NOT NULL,
    district VARCHAR(25) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(30) NOT NULL,
    country VARCHAR(30) NOT NULL,
    complement VARCHAR(50)
);

CREATE TABLE client(
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    id_address INT,
    phone VARCHAR(24) NOT NULL,
    FOREIGN KEY (id_address) REFERENCES address(id)
);
