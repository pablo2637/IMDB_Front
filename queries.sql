--1: Crear bd
CREATE DATABASE imdb
    WITH
    OWNER = postgres
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

--2: Crear tabla de users
CREATE TABLE users (
  user_id serial NOT NULL PRIMARY KEY, 
  name varchar(45) NOT NULL, 
  email varchar(100) NOT NULL UNIQUE,
  auth0_id varchar(200) NOT NULL
);

--3: Crear tabla de rols
CREATE TABLE rols (
  rol_id serial NOT NULL PRIMARY KEY, 
  rol varchar(45) NOT NULL, 
  user_id int,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--4: Crear tabla de favorites
CREATE TABLE favorites (
  favorite_id serial NOT NULL PRIMARY KEY, 
  user_id int,
  movie_id varchar(45),
  api_movie varchar(45),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--5: Crear tabla de logs
CREATE TABLE logs (
  log_id serial NOT NULL PRIMARY KEY, 
  user_id int,
  date varchar(45),
  event varchar(45),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);