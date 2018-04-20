// storing view functions in an object for export
const views = {};

// shows the ejs for all data query
views.showAll = (req, res) => {
  console.log('views showall');
  res.send(res.locals.data);
};

// shows the ejs for one data query
views.showOne = (req, res) => {
  console.log('views showone');
  res.send('hello');
};
// shows the ejs for the form
views.showForm = (req, res) => {
  console.log('views showform');
  // res.send('hello');
  res.render('ejs/user/signup');
};
// redirects for create one data entry
views.handleCreateDelete = (req, res) => {
  console.log('views handlecreatedelete');
  // res.redirect('hello');
};
// redirects for updating one data entry
views.handleUpdate = (req, res) => {
  console.log('views handleupdate');
  // res.redirect('hello');
};

//users
views.handleCreateDelete = (req, res) => {
  console.log('views handlecreatedelete');
  res.redirect('user/user');
};

module.exports = views;
