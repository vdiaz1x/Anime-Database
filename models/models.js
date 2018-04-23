/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
*/
// import pg promise
const pgp = require('pg-promise')();

// import config
const config = require('../config/config');

// set up db connection
const db = pgp(config);

// creating object to export models
const models = {};

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/

// saves one user (registration)
models.saveUser = (data) => {
  return db.one(`
  INSERT INTO users
    (fname, lname, username, password_hash)
  VALUES
    (
      $/fname/,
      $/lname/,
      $/username/,
      $/password_hash/
    )
  RETURNING * `, data);
};

// finds user by id to display in profile
// delete this function? seems to be obsolete
models.findUserId = (id) => {
  return db.one(`
  SELECT *
  FROM users
  WHERE id = $1
  `, id);
};

// find user by username to display in profile
models.findUserName = (id) => {
  return db.one(`
  SELECT username, password_hash, id
  FROM users
  WHERE username = $1
  `, id);
};

/*
|--------------------------------------------------------------------------
| Favorites
|--------------------------------------------------------------------------
*/

// saves a favorite anime in the db with relevant info
models.saveFavorite = (data) => {
  return db.one(`
  INSERT INTO user_faves
    (user_id, anime_id, anime_title, anime_image)
  VALUES
    (
      $1,
      $2,
      $3,
      $4
    )
  RETURNING * `, data);
};

// finds all favorite anime from a specific user to display in favorites list
models.findFavorite = (id) => {
  return db.many(`
  SELECT user_faves.anime_id,
         user_faves.anime_title,
         user_faves.anime_image,
         users.id AS user
  FROM user_faves
  JOIN users ON user_faves.user_id = users.id
  WHERE user_faves.user_id = $1
  `, id);
};

/*
|--------------------------------------------------------------------------
| Comments
|--------------------------------------------------------------------------
*/

// saves a comment for a specific anime in the db
models.saveComment = (data) => {
  return db.one(`
  INSERT INTO comments
    (user_id, anime_id, comment)
  VALUES
    (
      $1,
      $2,
      $3
    )
  RETURNING * `, data);
};

// finds all comments for a specific anime by anime id to display in comment list
models.findComment = (data) => {
  return db.any(`
  SELECT comments.*, user_faves.anime_title
  FROM comments
  JOIN user_faves ON user_faves.anime_id = comments.anime_id
  WHERE comments.user_id = $1 AND comments.anime_id = $2
  ORDER BY comments.id
  `, data);
};

// updates one comment in comment list, updates by id
models.updateComment = (data) => {
  return db.one(`
    UPDATE comments SET
        comment = $2
    WHERE id = $1
    RETURNING *
    `, data);
};

// deletes one comment in comment list, deletes by id
models.deleteComment = (id) => {
  return db.none(`
  DELETE
  FROM comments
  WHERE id = $1
  `, id);
};

// exporting models
module.exports = models;
