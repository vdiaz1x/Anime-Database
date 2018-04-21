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
  .get(views.showLogin)
  .post(controller.login, views.showUser);



router.route('/:id')
  // gets one thing
  .get(controller.findUser, views.showUser);
// // deletes one thing
// .delete(controller.destroy, views.handleCreateDelete);

router.route('/')
  // creates one user
  .post(controller.makeUser, views.handleCreateUser);

module.exports = router;

