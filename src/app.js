//MAIN SERVER FILE
var express   = require('express'),
    app       = express(),
    exphbs    = require('express-handlebars'),
    fs        = require('fs'),
    bodyParser = require('body-parser'),
    session     = require('express-session');
require('dotenv').config();    

///SET VIEW ENGINE
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  partialsDir: __dirname + '/views/partials/',
  layoutsDir: __dirname + '/views/layouts/',
  extname: '.hbs'
}));

app.set('view engine', 'hbs'); // Turn it on
app.set('views', __dirname + '/views'); //SET VIEWS dirrctory, which is not an hbs config. 

app.use(bodyParser.json())// supports encoded bodies
app.use(bodyParser.urlencoded({extended: true})) //supports encoded

app.use(express.static(__dirname + '/public')); //Tell express where to find static pages
//////SESSION CONFIGURATION
app.use(session({
  name: 'sessionclass',
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET
}));

//////////////////////////
////==Connect database
require('./config/db');
///////////////////

var server = app.listen(3000, function() {
  console.log( "Server listening at: " + server.address().port);
  console.log("Your __dirname: ");
  console.log(__dirname);
});


//Mount middleware
app.use('/account/?', require('./controllers/accounts'));

// app.use('/?', function(req, res, next) {
//   if (req.session.userId) {
//     next();
//   } else {
//     //res.redirect('/');
//     var message = "Please LOG IN to use this feature";
//     res.render('signin', {message: message});
//   }
// });


app.use('/user/?', require('./controllers/users'));
app.use('/game/?', require('./controllers/games'));

app.use('/item/?', require('./controllers/items'));
app.use('/friend/?', require('./controllers/friends'));

// app.use(require('./controllers/home'));



//Def Homepage
app.route('/?')
.get(function(req, res, next) {
  res.render('home', {
    pageTitle: 'Homepage'
  });
})


