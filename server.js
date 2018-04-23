/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
*/

// require all modules (dependencies)
const express = require('express');
const logger = require('morgan');
const parser = require('body-parser');
const path = require('path');
const override = require('method-override');
const session = require('express-session');

// setting up the routers
const user = require('./routes/user');
const shows = require('./routes/shows');

// require .env config
require('dotenv').config();

/*
|--------------------------------------------------------------------------
| Port and Server Configuration
|--------------------------------------------------------------------------
*/

// setting up the port
const port = process.env.PORT || 4000;

// setting up express
const app = express();

// setting up the logger in dev mode
app.use(logger('dev'));

// setting up the secret env variable for session
app.set('secret', process.env.SECRET);

// setting up the session for authentification
app.use(session({
  secret: app.get('secret'),
  resave: false,
  saveUninitialized: false,
}));

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

/*
|--------------------------------------------------------------------------
| Routing
|--------------------------------------------------------------------------
*/

// using router
app.use('/user', user);
app.use('/show', shows);

// default route
app.get('/', (req, res) => {
  res.render('ejs/index');
});

// error route
app.use((err, req, res, next) => {
  console.error('what error is this', err);
  res.status(400).send('Ya broke it!');
});
