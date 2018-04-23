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
// controller.index = (req, res, next) => {
//   models.findAll()
//     .then((data) => {
//       res.locals.data = data;
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json(err);
//     });
//   // console.log('controller index');
// };
// controller.make = (req, res, next) => {
//   // console.log('controller make');
// };
// controller.findOne = (req, res, next) => {
//   // console.log('controller findone');
// };
// controller.update = (req, res, next) => {
//   // console.log('controller update');
// };
// controller.destroy = (req, res, next) => {
//   // console.log('controller destroy');
// };

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/

// users
controller.findUser = (req, res, next) => {
  console.log('find user');

  models.findUserId(req.session.user.id)
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

// saves a user (hashes password before model)
controller.makeUser = async (req, res, next) => {
  // this hashes the password from the req.body and saves it back in the same place
  req.body.password_hash = await bcrypt.hash(req.body.password_hash, 11);

  // model used to save body, req.body contains new user info
  models.saveUser(req.body)
    .then((data) => {
      res.locals.data = data;
      // console.log('inside', data);
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
    // console.log(req.body);
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
    // saving the login data for user into locals
    res.locals.data = user;
    // saving the session with user data
    req.session.user = user;
    console.log(req.session);

    next();
  }

  // catches error
  catch (err) {
    console.log('THIS IS THE ERROR', err);
    next(err);
  }

  console.log('controller login');
};

controller.logout = (req, res, next) => {
  // destroys session
  req.session.destroy(err => next(err));
};

// what does this do???
controller.loginRequired = [
  /* this is either going to resolve to next(false) or next(null) */
  (req, res, next) => next(!req.session.user || null),
  (err, req, res, next) => res.sendStatus(401),
];

/*
|--------------------------------------------------------------------------
| Shows
|--------------------------------------------------------------------------
*/

// shows
controller.search = (req, res, next) => {
  if (req.session) { console.log(req.session); } else { console.log('nooooo'); }
  // grabbing the search parameter for the actual query
  // const parameter = req.body.parameter;
  const parameter = 'genres';

  // grabbing the query parameter from the req.body (from the search form)
  const query = req.body.query;

  // fetch call for API w/ dynamic variable
  fetch(`https://kitsu.io/api/edge/anime?sort=popularityRank&page%5Blimit%5D=20&filter%5B${parameter}%5D=${query}`)
    .then(res => res.json())
    .then((json) => {
      res.locals.anime = json;
      next();
    })
    .catch((err) => {
      res.json(err);
    });
};

controller.findOneShow = (req, res, next) => {
  if (req.session) { console.log(req.session); } else {
    console.log('nooooo');
  }

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

/*
|--------------------------------------------------------------------------
| Favorites
|--------------------------------------------------------------------------
*/

controller.makeFavorite = (req, res, next) => {
  // if (req.session) { console.log(req.session); } else {
  //   console.log('nooooo');
  // }
  // console.log(req.session.user.id);
  // console.log(req.body.anime_id);
  models.saveFavorite([req.session.user.id, req.body.anime_id, req.body.anime_title, req.body.anime_image])
    .then((data) => {
      res.locals.fave = data;
      // console.log(data);

      console.log('inside fave', data);
      next();
    })
    .catch((err) => {
      console.log('fave error', err);
      res.json(err);
    });
};

controller.showFavorite = (req, res, next) => {
  // if (req.session) { console.log(req.session); } else {
  //   console.log('nooooo');
  // }
  console.log('show all favorites');

  models.findFavorite(req.session.user.id)
    .then((data) => {
      res.locals.fave = data;
      // console.log(data);

      // console.log('inside fave find', data);
      next();
    })
    .catch((err) => {
      console.log('fave find error', err);
      res.json(err);
    });
};

/*
|--------------------------------------------------------------------------
| Comments
|--------------------------------------------------------------------------
*/

controller.makeComment = (req, res, next) => {
  if (req.session.user) { console.log(req.session.user); } else {
    console.log('no user');
  }
  // console.log(req.session.user.id);
  // console.log(req.body.anime_id);
  models.saveComment([req.session.user.id, req.body.anime_id, req.body.comment])
    .then((data) => {
      res.locals.comment = data;
      // console.log(data);

      // console.log('inside comment make', data);
      next();
    })
    .catch((err) => {
      console.log('comment error', err);
      res.json(err);
    });
};

controller.showComment = (req, res, next) => {
  if (req.session.user) { console.log(req.session.user); } else {
    console.log('no user');
  }
  // console.log(req.params.id);
  // console.log(req.session.user.id);

  models.findComment([req.session.user.id, req.params.id])
    .then((data) => {
      res.locals.comment = data;
      // console.log('controller', data);

      // console.log('inside comment find', data);
      next();
    })
    .catch((err) => {
      console.log('fave comment error', err);
      res.json(err);
    });
};

controller.updateComment;

controller.deleteComment = (req, res, next) => {
  console.log('controller destroy');
  console.log('req id', req.body.id);

  models.deleteComment(req.body.id)
    .then(() => next())
    .catch((err) => {
      console.log('fave comment error', err);
      res.json(err);
    });
};

module.exports = controller;
