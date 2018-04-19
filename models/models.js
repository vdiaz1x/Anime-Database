// import pg promise
const pgp = require('pg-promise')();

//import config
const config = require('../config/config');

//set up db connection
const db = pgp(config);

//creating object to export models
const models = {};

// models for main route
// gets all table data
models.findAll(){};

// makes one data entry in table
models.saveOne(data){};

//models for id route
// gets one table data entry
models.findById(id){};

// updates one table data entry
models.updateById(id, data){};

// deletes one table data entry
models.deleteById(id){};

//exporting models
module.exports = models;