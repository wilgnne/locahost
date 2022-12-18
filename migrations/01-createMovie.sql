CREATE TABLE movie (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(521) NOT NULL,
    releaseDate DATE NOT NULL,
    leaseTime DECIMAL(10, 2) NOT NULL,
    leaseValue DECIMAL(10, 2) NOT NULL,
    feeValue DECIMAL(10, 2) NOT NULL,
    synopsis VARCHAR(1024),
    amount INT,
    posterUrl VARCHAR(2048),
    coverUrl VARCHAR(2048)
);
