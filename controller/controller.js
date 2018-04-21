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

controller.makeUser = async (req, res, next) => {
  req.body.password_hash = await bcrypt.hash(req.body.password_hash, 11);
  console.log('outside', req.body);

  models.saveUser(req.body)
    .then((data) => {
      res.locals.data = data;
      console.log('inside', data);
      next();
    })
    .catch((err) => {
      console.log('error error error', err);
      res.json(err);
    });

  console.log('controller make');
};

controller.login = async (req, res, next) => {
  // try block to compare hashes/validate user
  // async function
  try {
    // grabs username and password from request
    const { username, password } = req.body;
    console.log(req.body);
    // finds the user info from model
    const user = await models.findUserName(username);

    // compares the password hash in db to newly made hash pw
    // returns boolean
    const valid = await bcrypt.compare(password, user.password_hash);

    // if not valid, throw error
    // manual throw err because bcyrpt does not throw own errors
    if (!valid) {
      throw { message: 'wrong password' };
    }
    res.locals.data = user;
    // saving the session with user data
    req.session.user = user;
    next();
  }
  // catches error
  catch (err) {
    console.log('THIS IS THE ERROR', err);
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
