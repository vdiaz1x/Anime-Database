
/*
|--------------------------------------------------------------------------
| Views
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/
// users
// shows the ejs for the form
views.showForm = (req, res) => {
  console.log('views showform');
  res.render('ejs/user/signup');
};

views.showLogin = (req, res) => {
  console.log('views showform');
  res.render('ejs/user/login');
};

views.handleCreateUser = (req, res) => {
  console.log('views handle create user');
  // console.log(res.locals.data)
  res.redirect(`user/${res.locals.data.id}`);
};

views.showUser = (req, res) => {
  // console.log('views show user');
  res.render('ejs/user/profile', { user: req.session.user });
  // console.log('THIS IS USER', user);
};

views.showFavorite = (req, res) => {
  console.log('views show fave');
  // res.send(res.locals.fave);
  res.render('ejs/user/favorites', { favorites: res.locals.fave });
  // res.render('ejs/user/profile', { user: res.locals.data });
  // console.log('THIS IS USER', user);
};

views.incorrectLogin = (err, req, res, next) => {
  console.log('views error user');
  res.render('ejs/user/error');
};
// views.handleLogIn = (req, res) => {
//   console.log('views handlelogin');
//   res.redirect('user/user');
// };

/*
|--------------------------------------------------------------------------
| Shows
|--------------------------------------------------------------------------
*/

// shows
views.showSearch = (req, res) => {
  console.log('show');
  res.render('ejs/shows/search');
};

views.showAllShows = (req, res) => {
  // console.log(res.locals.anime);
  // res.json(req);
  res.render('ejs/shows/index', { anime: res.locals.anime });
  // console.log({ anime: res.locals.anime });
};

views.showOneShow = (req, res) => {
  console.log(res.locals.anime_one);
  // res.json(req);
  res.render('ejs/shows/show', { anime: res.locals.anime_one });
};

module.exports = views;
//
