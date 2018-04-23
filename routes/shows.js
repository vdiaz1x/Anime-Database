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
// set up route for getting, making, updating, and deleting comments
router.route('/:id/comment')
  // gets all comments
  .get(controller.showComment, views.showComment)
  // posts one comment
  .post(controller.makeComment, controller.showComment, views.showComment)
  // puts one comment
  .put(controller.updateComment, controller.showComment, views.showComment)
  // deletes one comments
  .delete(controller.deleteComment, controller.showComment, views.showComment);

// set up routes for search via API and getting shows
router.route('/search')
  // shows the form for the anime request
  .get(views.showSearch);

// set up routes for getting show by id
router.route('/:id')
// gets one show that was queried
  .get(controller.findOneShow, views.showOneShow);

// set up routes for grabbing search query for API
router.route('/')
  // posts search information for query
  .post(controller.search, views.showAllShows);

// exporting router
module.exports = router;
