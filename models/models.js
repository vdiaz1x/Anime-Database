// import pg promise
const pgp = require('pg-promise')();

// import config
const config = require('../config/config');

// set up db connection
const db = pgp(config);

// creating object to export models
const models = {};

// models for main route

// what do we need the models for?
// create users (/user/new)
// delete users (/users)
// create comments (/users/comments)
// update comments (users/comments)
// delete comments (users/comments)
// get query of shows (/anime)
// get one show (anime/id)
// show user list of shows (users/shows)


// gets all table data
models.findAll = () => {
  console.log('models findall');
  return db.many(`
  SELECT * FROM users
  `);
};
// makes one data entry in table
models.saveOne = (data) => {
  console.log('models saveone');
};
// models for id route
// gets one table data entry
models.findById = (id) => {
  console.log('models findid');
};
// updates one table data entry
models.updateById = (id, data) => {
  console.log('models updateid');
};
// deletes one table data entry
models.deleteById = (id) => {
  console.log('models deleteid');
};

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

  console.log('models saveone');
};

models.findUserId = (id) => {
  return db.one(`
  SELECT *
  FROM users
  WHERE id = $1
  `, id)
}

models.findUserName = (id) => {
  return db.one(`
  SELECT username, password_hash, id
  FROM users
  WHERE username = $1
  `, id)
}

// favorites
models.saveFavorite = (data) => {
  console.log(data);

  return db.one(`
  INSERT INTO user_faves
    (user_id, anime_id)
  VALUES
    (
      $1,
      $2
    )
  RETURNING * `, data);

  console.log('models save fave');
};

// exporting models
module.exports = models;
