CREATE TABLE booking(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_client INT NOT NULL,
    id_movie INT NOT NULL,
    startDate DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    returnDate DATE DEFAULT NULL,
    FOREIGN KEY (id_client) REFERENCES client(id),
    FOREIGN KEY (id_movie) REFERENCES movie(id)
);
