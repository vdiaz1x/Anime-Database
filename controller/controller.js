/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/

// import models
const models = require('../models/models');

// import fetch
const fetch = require('node-fetch');

// import bcrypt
const bcrypt = require('bcrypt');

// storing controller functions in an for export
const controller = {};

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
controller.findUser = (req, res, next) => {
  models.findUserId(req.params.id)
    .then((data) => {
      res.locals.user = data;
      console.log(data);
      next();
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });

  console.log('controller find');
};

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

controller.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await models.findUserId(username);
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      throw { message: 'wrong password' };
    }

    req.session.user = user;
    next();
  } catch (err) {
    next(err);
  }

  console.log('controller login');
};

// shows
controller.search = (req, res, next) => {
  // grabbing the query parameter from the req.body (from the search form)
  const anime_query = req.body.query;
  // fetch call for API w/ dynamic variable
  fetch(`https://kitsu.io/api/edge/anime?filter%5Bgenres%5D=${anime_query}`)
    .then(res => res.json())
    .then((json) => {
      res.locals.anime = json;
      next();
    })
    .catch((err) => {
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
