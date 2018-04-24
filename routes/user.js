/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
*/
// import express
const express = require('express');

// set up routing
const router = express.Router();

// set up controller
const controller = require('../controller/controller');

// set up views
const views = require('../controller/views');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// set up routes for user creation and authentification
router.route('/new')
  // gets sign up form
  .get(views.showForm);

// set up routes for getting user login form
router.route('/login')
  // gets login form
  .get(views.showLogin);

// set up routes for getting and making profile for user info
router.route('/profile')
  // gets user profile
  .get(controller.findUser, views.showUser, views.incorrectLogin)
  // posts user login data
  .post(controller.login, views.showUser, views.incorrectLogin);

// set up routes for the getting and making favorites
router.route('/favorites')
  // gets all shows
  .get(controller.showFavorite, views.showFavorite)
  // posts one favorite
  .post(controller.makeFavorite, controller.showOneFavorite, controller.showFavorite, views.showFavorite);

// set up routes to make new user
router.route('/')
  // posts one user
  .post(controller.makeUser, views.handleCreateUser);

// exporting router
module.exports = router;
