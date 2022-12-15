CREATE TABLE genre (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

CREATE TABLE movie (
    id INT PRIMARY KEY AUTO_INCREMENT,
    release_year YEAR NOT NULL,
    lease_time TIMESTAMP NOT NULL,
    lease_value DECIMAL(10, 2) NOT NULL,
    fee_value DECIMAL(10, 2) NOT NULL,
    id_genre INT NOT NULL,
    synopsis VARCHAR(1024),
    amount INT,
    FOREIGN KEY (id_genre) REFERENCES genre(id)
);
