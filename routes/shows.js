// import express
const express = require('express');

// set up routing
const router = express.Router();

// set up controller
const controller = require('../controller/controller');

// set up views
const views = require('../controller/views');

// // set up routes
// router.route('/:id/edit')
//   // gets form to edit
//   .get(controller.findOne, views.showForm);

router.route('/search')
  // gets new form
  .get(views.showSearch);

router.route('/:id')
// gets one thing
  .get(controller.findOneShow, views.showOneShow)
// updates one thing
// .put(controller.update, views.handleUpdate)
// // deletes one thing
// .delete(controller.destroy, views.handleCreateDelete);

router.route('/')
  // gets everything
  // .get(controller.indexShows, views.showAllShows)
  // creates one thing
  .post(controller.search, views.showAllShows);

module.exports = router;
