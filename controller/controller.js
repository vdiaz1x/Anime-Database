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
| Users
|--------------------------------------------------------------------------
*/

// finds the user by using the find user model for db query
controller.findUser = (req, res, next) => {
  // console.log('find user');
  console.log(req.session.user);
  // model using the user's id in the session data as a parameter
  // will fail if there is no user in a session
  models.findUserId(req.session.user.id)
    .then((data) => {
      // saves data to locals for access in views
      res.locals.user = data;
      // passes data on to views
      next();
    })
    .catch((err) => {
      // console.log(err);
      res.json(err);
    });
};

// saves a user in the db using the make user model
// hashes password before inserting into model
controller.makeUser = async (req, res, next) => {
  // this hashes the password from the req.body and saves it back in the same place
  req.body.password_hash = await bcrypt.hash(req.body.password_hash, 11);

  console.log('here');
  // model used to save new user using the new user info stored in req.body
  models.saveUser(req.body)
    .then((data) => {
      // saves data to locals for access in views
      res.locals.data = data;
      req.session.user = data;
      // passes data on to views
      next();
    })
    .catch((err) => {
      // console.log('error error error', err);
      res.json(err);
    });
};

// logs in user using a comparison to existing user in db to match hashes/validate user
// async function
controller.login = async (req, res, next) => {
  // try validation
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
    // saves data to locals for access in views
    res.locals.data = user;
    // saving the session with user data
    req.session.user = user;
    // passes data on to views
    next();
  } catch (err) {
    // console.log('THIS IS THE ERROR', err);
    // passes error on to views
    next(err);
  }
};

// logs out user by destroying user info from session
controller.logout = (req, res, next) => {
  // destroys session
  req.session.destroy(err => next(err));
};

// what does this do???
// controller.loginRequired = [
//   /* this is either going to resolve to next(false) or next(null) */
//   (req, res, next) => next(!req.session.user || null),
//   (err, req, res, next) => res.sendStatus(401),
// ];

/*
|--------------------------------------------------------------------------
| Shows
|--------------------------------------------------------------------------
*/


// makes query of anime by using fetch and anime api to get data
controller.search = (req, res, next) => {
  // grabbing the search parameter for the actual query
  // const parameter = req.body.parameter;
  const parameter = 'genres';

  // grabbing the query parameter from the req.body (from the search form)
  const { query } = req.body;

  // fetch call for API w/ dynamic variable
  fetch(`https://kitsu.io/api/edge/anime?sort=popularityRank&page%5Blimit%5D=20&filter%5B${parameter}%5D=${query}`)
    // parses the promise response to extract data
    .then(res => res.json())
    // gets actual fetched data
    .then((json) => {
      // saves data to locals for access in views
      res.locals.anime = json;
      // passes data on to views
      next();
    })
    .catch((err) => {
      res.json(err);
    });
};

// finds one show by using fetch and anime api to get data
controller.findOneShow = (req, res, next) => {
  // getting the anime id from the id parameter in the url
  const animeId = req.params.id;
  // fetch call for API w/ anime id
  fetch(`https://kitsu.io/api/edge/anime/${animeId}`)
    // parses the promise response to extract data
    .then(res => res.json())
    // gets actual fetched data
    .then((json) => {
      // saves data to locals for access in views
      res.locals.anime_one = json;
      // passes data on to views
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

// saves a favorite in the db using the save favorite model
controller.makeFavorite = (req, res, next) => {
  // model used to save favorite using the user id in the session data and the the anime info
  models.saveFavorite([req.session.user.id, req.body.anime_id, req.body.anime_title, req.body.anime_image])
    .then((data) => {
      // saves data to locals for access in views
      res.locals.fave = data;
      // console.log(data);
      // console.log('inside fave', data);
      // passes data on to views
      next();
    })
    .catch((err) => {
      // console.log('fave error', err);
      res.json(err);
    });
};

// shows all favorited anime in the db using the find favorite model
controller.showFavorite = (req, res, next) => {
  // console.log('show all favorites');

  // model used to find favorites using the user id in the session data as a parameter
  models.findFavorite(req.session.user.id)
    .then((data) => {
      // saves data to locals for access in views
      res.locals.fave = data;
      // passes data on to views
      next();
    })
    .catch((err) => {
      // console.log('fave find error', err);
      res.json(err);
    });
};

/*
|--------------------------------------------------------------------------
| Comments
|--------------------------------------------------------------------------
*/

// makes a comment on favorite anime using the save comment model
controller.makeComment = (req, res, next) => {
  // model used to save comment using the user id in the session data,
  // the anime id, and the comment message
  models.saveComment([req.session.user.id, req.body.anime_id, req.body.comment])
    .then((data) => {
      // saves data to locals for access in views
      res.locals.comment = data;
      // passes data on to views
      next();
    })
    .catch((err) => {
      // console.log('comment error', err);
      res.json(err);
    });
};

// shows comments on favorite anime using the find comment model
controller.showComment = (req, res, next) => {
  // model used to find comments using the user id in the session data and the anime id
  // found in the id parameter of the url
  models.findComment([req.session.user.id, req.params.id])
    .then((data) => {
      // saves data to locals for access in views
      res.locals.comment = data;
      // passes data on to views
      next();
    })
    .catch((err) => {
      // console.log('fave comment error', err);
      res.json(err);
    });
};

// updates comment on favorited anime using the update comment model
controller.updateComment = (req, res, next) => {
  // console.log('controller destroy');
  // console.log('req', req.body);

  // model used to update comment using comment id and comment message as parameter
  models.updateComment([req.body.id, req.body.comment])
    // passes data on to views
    .then(() => next())
    .catch((err) => {
      // console.log('update comment error', err);
      res.json(err);
    });
};

// deletes comment on favorited anime using the delete comment model
controller.deleteComment = (req, res, next) => {
  // console.log('controller destroy');
  // console.log('req id', req.body.id);
  // model used to delete comment using comment id as parameter
  models.deleteComment(req.body.id)
    // passes data on to views
    .then(() => next())
    .catch((err) => {
      // console.log('fave comment error', err);
      res.json(err);
    });
};

// exporting controller
module.exports = controller;
