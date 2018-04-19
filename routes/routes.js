// import express
const express = require('express');

// set up routing
const router = express.Router();

// set up controller
const controller = require('../controller/controller');

// set up views
const views = require('../controller/views');

// set up routes
router.route('/:id/edit')
  // gets form to edit
  .get(controller.findOne, views.showForm);

router.route('/new')
  // gets new form
  .get(controller.make, views.showForm);

router.route('/:id')
  // gets one thing
  .get(controller.findOne, views.showOne)
  // updates one thing
  .put(controller.update, views.handleUpdate)
  // deletes one thing
  .delete(controller.destroy, views.handleCreateDelete);

router.route('/')
  // gets everything
  .get(controller.index, views.showAll)
  // creates one thing
  .post(controller.make, views.handleCreateDelete);

module.exports = router;
