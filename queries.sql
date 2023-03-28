--1: Crear bd
CREATE DATABASE imdb
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

--2: Crear tabla de users
CREATE TABLE users (
  user_id serial NOT NULL PRIMARY KEY, 
  name varchar(45) NOT NULL, 
  email varchar(100) NOT NULL UNIQUE,
  password varchar(200) NOT NULL
);

--3: Crear tabla de rols
CREATE TABLE rols (
  rol_id serial NOT NULL PRIMARY KEY, 
  rol varchar(45) NOT NULL, 
  user_id int,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--4: Crear table de favorites
CREATE TABLE favorites (
  favorite_id serial NOT NULL PRIMARY KEY, 
  user_id int,
  movie_id varchar(45),
  api_movie varchar(45),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--5: Crear admin (password: admin, se guarda encriptado)
INSERT INTO users(name,email,password)
VALUES
('pepe','pepe@correo.es','$2a$10$a.x4kbAfyVBRwcJX.TW4S.GniM1hWeeNuOVWgRg3jKtd4UebOx5FC');

--6: Crear rol admin
INSERT INTO rols(rol,user_id)
VALUES
('admin',1);

--7: Crear resto usuarios (password: 123456, se guarda encriptado)
INSERT INTO users(name,email,password)
VALUES
('ana','ana@correo.es','$2a$10$a23Xb31R5vIdedwkz/wl4epHZt6GerLQVU/y2PFZm28vBT4qrAm2i'),
('pedro','pedro@correo.es','$2a$10$a23Xb31R5vIdedwkz/wl4epHZt6GerLQVU/y2PFZm28vBT4qrAm2i'),
('luis','luis@correo.es','$2a$10$a23Xb31R5vIdedwkz/wl4epHZt6GerLQVU/y2PFZm28vBT4qrAm2i'),
('laura','laura@correo.es','$2a$10$a23Xb31R5vIdedwkz/wl4epHZt6GerLQVU/y2PFZm28vBT4qrAm2i');

--8: Crear resto rolers users
INSERT INTO rols(rol,user_id)
VALUES
('user',2),
('user',3),
('user',4),
('user',5);