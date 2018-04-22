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
  // gets form for signing up
  .get(views.showForm);

router.route('/login')
  .get(views.showLogin);

router.route('/profile')
  // .get(controller.findUser, views.showUser, views.incorrectLogin)
  .post(controller.login, views.showUser, views.incorrectLogin);

router.route('/:id');
// gets one thing
// .get(controller.findUser, views.showUser, views.incorrectLogin);
// // deletes one thing
// .delete(controller.destroy, views.handleCreateDelete);

router.route('/favorites')
  .get(controller.showFavorite, views.showFavorite)
  // favorites one show
  .post(controller.makeFavorite, views.showFavorite);

router.route('/')
  // creates one user
  .post(controller.makeUser, views.handleCreateUser);

module.exports = router;

