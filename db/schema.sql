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
  anime_id        INT NOT NULL
);

INSERT INTO users
(fname, lname, username, password_hash)
VALUES