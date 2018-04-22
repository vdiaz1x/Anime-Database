-- run script to create database and tables
-- psql -f db/schema.sql

-- drop database if it exists
DROP DATABASE IF EXISTS anime_db_dev;

-- create database
CREATE DATABASE anime_db_dev;

-- go into database
\c anime_db_dev

-- drop tables if they exist
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_faves CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

--create table for users
CREATE TABLE users (
  id              SERIAL PRIMARY KEY NOT NULL,
  fname           TEXT,
  lname           TEXT,
  username        TEXT UNIQUE,
  password_hash   TEXT
);

-- create table for user favorites
CREATE TABLE user_faves (
  user_id         INT REFERENCES users(id) NOT NULL,
  anime_id        INT NOT NULL,
  anime_title     TEXT,
  anime_image     TEXT
);

-- create table for comments
CREATE TABLE comments (
  id              SERIAL PRIMARY KEY NOT NULL,
  user_id         INT REFERENCES users(id) NOT NULL,
  anime_id        INT NOT NULL,
  comment         TEXT
);

-- inserting sample user for testing
INSERT INTO users
(fname, lname, username, password_hash)
VALUES
('Vinicio', 'Diaz', 'vdiaz', '$2b$11$GliuyTM8gRqmRVAgstJe..xUQlCUx/O7NfRY9MiQfHcQ4FryclEuu');

-- inserting sample user for testings
INSERT INTO user_faves
(user_id, anime_id, anime_title, anime_image)
VALUES
(1, 1415, 'Code Geass: Lelouch of the Rebellion', 'https://media.kitsu.io/anime/poster_images/1415/large.jpg?1408443967');

-- inserting sample comment for testing
INSERT INTO comments
(user_id, anime_id, comment)
VALUES
(1, 1415, '10/10 GOAT');