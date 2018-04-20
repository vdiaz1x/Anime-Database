/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/

// import models
const models = require('../models/models');

// import fetch
const fetch = require('node-fetch');

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
  models.saveUser(req.body)
    .then((data) => {
      res.locals.data = data;
      console.log(data);
      next();
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });

  console.log('controller make');
};

// shows
controller.search = (req, res, next) => {
  console.log(req.body);
  // fetch('https://kitsu.io/api/edge/anime?filter%5Bgenres%5D=mecha');
  const anime_query = req.body.id;
  fetch(`https://kitsu.io/api/edge/anime/${anime_query}`)
    .then(res => res.json())
    .then((json) => {
      // res.send(json);
      res.locals.anime = json;
      next();
    })
    .catch((err) => {
      // console.log(err);
      res.json(err);
    });
};

controller.indexShows = (req, res, next) => {
  console.log(req.body);
  next();
};

controller.findOneShow = (req, res, next) => {
  const anime_id = req.params.id;
  fetch(`https://kitsu.io/api/edge/anime/${anime_id}`)
    .then(res => res.json())
    .then((json) => {
      // res.send(json);
      res.locals.anime_one = json;
      next();
    })
    .catch((err) => {
      // console.log(err);
      res.json(err);
    });
};

module.exports = controller;
