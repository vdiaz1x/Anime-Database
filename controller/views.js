
/*
|--------------------------------------------------------------------------
| Views
|--------------------------------------------------------------------------
*/

// storing view functions in an object for export
const views = {};

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/

// users
// shows the ejs for the form
views.showForm = (req, res) => {
  res.render('ejs/user/signup');
};

views.showLogin = (req, res) => {
  res.render('ejs/user/login');
};

views.handleCreateUser = (req, res) => {
  res.redirect('user/profile');
};

views.showUser = (req, res) => {
  res.render('ejs/user/profile', { user: req.session.user });
};

views.incorrectLogin = (err, req, res) => {
  res.render('ejs/user/error');
};

/*
|--------------------------------------------------------------------------
| Shows
|--------------------------------------------------------------------------
*/

// shows
views.showSearch = (req, res) => {
  res.render('ejs/shows/search');
};

views.showAllShows = (req, res) => {
  // console.log(res.locals.anime);
  // res.json(req);
  res.render('ejs/shows/index', { anime: res.locals.anime });
  // console.log({ anime: res.locals.anime });
};

views.showOneShow = (req, res) => {
  res.render('ejs/shows/show', { anime: res.locals.anime_one });
};

/*
|--------------------------------------------------------------------------
| Favorites
|--------------------------------------------------------------------------
*/

views.showFavorite = (req, res) => {
  res.render('ejs/user/favorites', { favorites: res.locals.fave });
};

/*
|--------------------------------------------------------------------------
| Comments
|--------------------------------------------------------------------------
*/

views.showComment = (req, res) => {
  res.render('ejs/shows/comments', { comments: res.locals.comment, fave: res.locals.fave_one });
};

views.showOneComment = (req, res) => {
  res.json(res.locals.comment_one);
};

module.exports = views;
//
