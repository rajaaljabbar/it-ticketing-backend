-- Membuat Database
CREATE DATABASE it_ticketing;

-- Gunakan Database yang baru dibuat
\c it_ticketing;

-- Membuat Tabel Departemen
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    nama_dept VARCHAR(100) NOT NULL
);

-- Membuat Tabel Tiket
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    dept VARCHAR(100) NOT NULL,
    no_hp VARCHAR(15) NOT NULL,
    deskripsi TEXT NOT NULL,
    prioritas VARCHAR(10) CHECK (prioritas IN ('Low', 'Medium', 'High')),
    status VARCHAR(15) DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved')),
    tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'User', -- Role bisa 'User' atau 'Admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, password, role) VALUES
('user@example.com', 'user123', 'User'),
('admin@example.com', 'admin123', 'Admin');

select * from users