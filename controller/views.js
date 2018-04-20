// storing view functions in an object for export
const views = {};

const fetch = require('node-fetch');


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

// users
views.handleCreateUser = (req, res) => {
  console.log('views handlecreatedelete');
  res.redirect('user/user');
};

// shows
views.showSearch = (req, res) => {
  console.log('show');
  res.render('ejs/shows/search');
};

views.showAllShows = (req, res) => {
  console.log(res.locals.anime);
  // res.json(req);
  res.render('ejs/shows/index', { anime: res.locals.anime });
};

views.showOneShow = (req, res) => {
  console.log(res.locals.anime_one);
  // res.json(req);
  res.render('ejs/shows/show', { anime: res.locals.anime_one });
};

module.exports = views;

// fetch('https://kitsu.io/api/edge/anime?filter%5Bgenres%5D=mecha')
//   .then(res => res.json())
//   .then(json => res.send(json));
