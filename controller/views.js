
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
  // console.log('views showform');
  res.render('ejs/user/signup');
};

views.showLogin = (req, res) => {
  // console.log('views showform');
  res.render('ejs/user/login');
};

views.handleCreateUser = (req, res) => {
  // console.log('views handle create user');
  // console.log(res.locals.data)
  res.redirect('user/profile');
};

views.showUser = (req, res) => {
  // console.log('views show user');
  res.render('ejs/user/profile', { user: req.session.user });
  // console.log('THIS IS USER', user);
};

views.incorrectLogin = (err, req, res) => {
  // console.log('views error user');
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
  // console.log('show');
  res.render('ejs/shows/search');
};

views.showAllShows = (req, res) => {
  // console.log(res.locals.anime);
  // res.json(req);
  res.render('ejs/shows/index', { anime: res.locals.anime });
  // console.log({ anime: res.locals.anime });
};

views.showOneShow = (req, res) => {
  // console.log(res.locals.anime_one);
  // res.json(req);
  res.render('ejs/shows/show', { anime: res.locals.anime_one });
};

/*
|--------------------------------------------------------------------------
| Favorites
|--------------------------------------------------------------------------
*/

views.showFavorite = (req, res) => {
  // console.log('views show fave', res.locals.anime);
  res.render('ejs/user/favorites', { favorites: res.locals.fave });
};

/*
|--------------------------------------------------------------------------
| Comments
|--------------------------------------------------------------------------
*/

views.showComment = (req, res) => {
  // console.log(res.locals.comment);
  // res.json(res.locals.comment);
  res.render('ejs/shows/comments', { comments: res.locals.comment, fave: res.locals.fave_one });
  // console.log({ comment: res.locals.comment });
};

views.showOneComment = (req, res) => {
  // console.log(res.locals.comment_one);
  res.json(res.locals.comment_one);
  // res.render('ejs/shows/show', { comment_one: res.locals.comment_one });
};

module.exports = views;
//
