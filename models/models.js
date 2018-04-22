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

// models for main route

// gets all table data
// models.findAll = () => {
//   console.log('models findall');
//   return db.many(`
//   SELECT * FROM users
//   `);
// };
// // makes one data entry in table
// models.saveOne = (data) => {
//   console.log('models saveone');
// };
// // models for id route
// // gets one table data entry
// models.findById = (id) => {
//   console.log('models findid');
// };
// // updates one table data entry
// models.updateById = (id, data) => {
//   console.log('models updateid');
// };
// // deletes one table data entry
// models.deleteById = (id) => {
//   console.log('models deleteid');
// };

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/
// user
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

models.findUserId = (id) => {
  return db.one(`
  SELECT *
  FROM users
  WHERE id = $1
  `, id);
};

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

// favorites
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

models.findComment = (data) => {
  return db.many(`
  SELECT *
  FROM comments
  WHERE user_id = $1 AND anime_id = $2
  `, data);
};

models.updateComment = (id, data) => {
  return db.one(`
    UPDATE comments SET
        user_id = $/data.user_id/,
        anime_id = $/data.anime_id/,
        comment = $/data.comment/,
    WHERE id = $/id/
    RETURNING *
    `, { id, data });
};

models.deleteComment = (id) => {
  return db.none(`
  DELETE
  FROM comments
  WHERE id = $1
  `, id);
};

// exporting models
module.exports = models;
