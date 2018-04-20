/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/

// import models
const models = require('../models/models');

// storing controller functions in an for export
const controller = {};

// const resData = (data) => {
//   res.locals.data = data;
//   next();
// };

// const errData = err => res.json(err);

/*
|--------------------------------------------------------------------------
| Functions
|--------------------------------------------------------------------------
*/

// takes the info from the models and passes it to the views
controller.index = (req, res, next) => {
  models.findAll()
    .then((data) => {
      res.locals.data = data;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
  console.log('controller index');
};
controller.make = (req, res, next) => {
  console.log('controller make');
};
controller.findOne = (req, res, next) => {
  console.log('controller findone');
};
controller.update = (req, res, next) => {
  console.log('controller update');
};
controller.destroy = (req, res, next) => {
  console.log('controller destroy');
};

// users
controller.makeUser = (req, res, next) => {
  models.saveUser()
    .then(data => {
      res.locals.data = data;
      next();
    })
    .catch(err => res.json(err));

  console.log('controller make');
};

module.exports = controller;
