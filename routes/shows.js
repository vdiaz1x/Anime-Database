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
// set up route for comments
router.route('/:id/comment')
  .get(controller.showComment, views.showComment)
  .post(controller.makeComment, views.showComment);

// // set up routes for search and display shows
router.route('/search')
  // shows the form for the anime request
  .get(views.showSearch);

router.route('/:id')
// gets one show that was queried
  .get(controller.findOneShow, views.showOneShow);

router.route('/')
  // posts search information for query
  .post(controller.search, views.showAllShows);

module.exports = router;
