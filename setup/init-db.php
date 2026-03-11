<?php

$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_port = '3306';

try {
    $pdo = new PDO(
        "mysql:host={$db_host};port={$db_port};charset=utf8mb4",
        $db_user,
        $db_pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // Create database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS fytnew CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $pdo->exec("USE fytnew");

    // Users table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            role ENUM('admin', 'advisor', 'client') DEFAULT 'client',
            status ENUM('active', 'inactive') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_role (role),
            INDEX idx_status (status)
        )
    ");

    // Regions table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS regions (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL UNIQUE,
            slug VARCHAR(100) UNIQUE,
            description TEXT,
            status ENUM('active', 'inactive') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_status (status)
        )
    ");

    // Countries table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS countries (
            id INT PRIMARY KEY AUTO_INCREMENT,
            region_id INT NOT NULL,
            name VARCHAR(100) NOT NULL UNIQUE,
            country_code VARCHAR(2) UNIQUE,
            slug VARCHAR(100) UNIQUE,
            image_url VARCHAR(255),
            tourism_description TEXT,
            featured TINYINT(1) DEFAULT 0,
            status ENUM('active', 'inactive') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (region_id) REFERENCES regions(id),
            INDEX idx_region_id (region_id),
            INDEX idx_featured (featured),
            INDEX idx_status (status)
        )
    ");

    // Tours table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS tours (
            id INT PRIMARY KEY AUTO_INCREMENT,
            country_id INT,
            title VARCHAR(255) NOT NULL,
            description LONGTEXT,
            image_url VARCHAR(255),
            duration_days INT,
            price DECIMAL(10, 2),
            featured TINYINT(1) DEFAULT 0,
            status ENUM('active', 'inactive') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (country_id) REFERENCES countries(id),
            INDEX idx_country_id (country_id),
            INDEX idx_featured (featured),
            INDEX idx_status (status)
        )
    ");

    // Tour schedules table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS tour_schedules (
            id INT PRIMARY KEY AUTO_INCREMENT,
            tour_id INT NOT NULL,
            scheduled_date DATE NOT NULL,
            available_slots INT DEFAULT 0,
            status ENUM('active', 'inactive') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tour_id) REFERENCES tours(id),
            INDEX idx_tour_id (tour_id),
            INDEX idx_scheduled_date (scheduled_date),
            INDEX idx_status (status)
        )
    ");

    // Bookings table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS bookings (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            tour_id INT NOT NULL,
            schedule_id INT,
            booking_date DATE NOT NULL,
            status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (tour_id) REFERENCES tours(id),
            FOREIGN KEY (schedule_id) REFERENCES tour_schedules(id),
            INDEX idx_user_id (user_id),
            INDEX idx_tour_id (tour_id),
            INDEX idx_status (status)
        )
    ");

    echo "✓ Database 'fytnew' created successfully with all required tables.\n";

} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}
