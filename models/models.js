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

// exporting models
module.exports = models;
