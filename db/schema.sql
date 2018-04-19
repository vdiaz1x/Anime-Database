-- drop database if it exists
DROP DATABASE IF EXISTS anime_db_dev;

-- create database
CREATE DATABASE anime_db_dev;

-- go into database
\c anime_db_dev

-- drop tables if they exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_faves;

--create table for users
CREATE table users (
  id              SERIAL PRIMARY KEY NOT NULL,
  fname           TEXT,
  lname           TEXT,
  username        TEXT,
  password_hash   TEXT
);

-- create table for user favorites
CREATE TABLE user_faves (
  user_id         INT REFERENCES users(id) NOT NULL,
  anime_id        INT NOT NULL
);

INSERT INTO users
(fname, lname, username, password_hash)
VALUES
('Vinicio', 'Diaz', 'vdiaz', 'password');