// require all modules (dependencies)
const express = require('express');
const logger = require('morgan');
const parser = require('body-parser');
const path = require('path');
const override = require('method-override');
const session = require('express-session');
// const authService = require('./auth/service');
// const authRouter = require('./auth/router');

// setting up the routers
const routes = require('./routes/routes');
const user = require('./routes/user');

// require.env config
require('dotenv').config();

// setting up the port
const port = process.env.PORT || 4000;

// setting up express
const app = express();

// setting up the logger in dev mode
app.use(logger('dev'));

// setting up the secret env variable for session
// app.set('secret', process.env.SECRET);

// setting up the session for authentification
// app.use(session({
//   secret: app.get('secret'),
//   resave: false,
//   saveUninitialized: false,
// }));

// setting up the body parser
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

// setting up the ejs engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// what does this do? find the public folder?
app.use(express.static(path.join(__dirname, 'css')));

// setting up method override
app.use(override('_method'));

// listening to the port
app.listen(port, () => console.log(`Listening on port: ${port} in ${app.get('env')} mode!`))
  .on('error', console.error);

// using router
app.use('/route', routes);
app.use('/user', user);

// using auth router
// app.use('/auth', authRouter)

// auth route
// app.get('/profile', authService.login, (req, res) => {
//   // res.render('welcome.ejs')
//   // res.send('send')
//   res.json(req.session)
// });

// default route
app.get('/', (req, res) => {
  // res.send('i am home');
  // renders the index page
  // fetch('http://example.com/movies.json')
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (myJson) {
  //     console.log(myJson);
  //   });

  res.render('ejs/index');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).send('Ya broke it!');
});
