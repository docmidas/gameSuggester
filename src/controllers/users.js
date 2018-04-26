var express   = require('express'),
    Users  = express.Router(),
    fs        = require('fs'),
    mongoose  = require('mongoose'),
    User   = require('../models/user'),
    bcrypt = require('bcrypt');
    // var Gift        = require(__dirname + '/../models/gift');
///////////
////SUCCESFUL LOGIN OR SIGN UP LEADS HERE
Users.route('/signin/?')
  .get(function(req, res, next) {
    res.render('signin', {isLoggedIn: req.session.isLoggedIn ? true : false});
  })
  // Login User
  .post(function(req, res, next) {
    req.body.username = req.body.username.toLowerCase();
    User.findOne({username: req.body.username}, function(error, user) {
      if (error || !user) {
        res.send('Could not find user');
      } else {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (err) {
            res.send('ERROR: ' + err);
          } else if (result) {
            req.session.isLoggedIn  = true;
            req.session.userId      = user._id;
            res.redirect('/items/rate');

          } else {
            res.render('signin', {message: "Wrong Password", isLoggedIn: req.session.isLoggedIn ? true : false});
          }
        })
      }
    })
  });

Users.route('/signout/?')
.get(function(req, res, next) {
  req.session.isLoggedIn  = false;
  req.session.userId      = null;
  res.redirect("/signin");
})

Users.route('/register/?')
// GET /
// -----
// Serve the homepage
.get(function(req, res, next) {
  res.render('register', {isLoggedIn: req.session.isLoggedIn ? true : false});
})
// POST /
// ------
// Register a new user
.post(function(req, res, next) {
  ////DEX, ensure unique username and email here!!!!!
  var unique = true;
  var message = "";
  var usernameCheck = false;
  var emailCheck = false;  
  req.body.username = req.body.username.toLowerCase();
  req.body.email = req.body.email.toLowerCase();
  // console.log("THIS IS THE ATTEMPTED UN: " + req.body.username);
  // console.log("THIS IS THE ATTEMPTED EMAIL: " + req.body.email);  
  User.findOne({username: req.body.username}, function(error, username) {
      if (username || req.body.username == "myprofile") { //prevents trolls from ruining myprofile page
        unique = false;
        message = "Please retry: USERNAME is already taken";
      } 
     User.findOne({email: req.body.email}, function(error, email) {
        if (email) {
          unique = false;
          message += " Please try LOGGING IN. This email is already registered"
        }

        if(unique === false){
        //console.log(message);
        res.render('register', {message: message, isLoggedIn: req.session.isLoggedIn ? true : false}); 
      }else{

          bcrypt.hash(req.body.password, 10, function(err, hash) {
            // Save user inside here
            User.create({
              username: req.body.username,
              password: hash,
              email: req.body.email,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              geekName: req.geekName,
              contact: req.body.contact=="true"? true: false
            }, function(err, user) {
              if (err) {
                console.log(err);
                res.render('home', {error: err, isLoggedIn: req.session.isLoggedIn ? true : false});
              } else {
                req.session.isLoggedIn  = true;
                req.session.userId      = user._id;
                //console.log("Session USER ID HAS BEEN SET: " + req.session.userId );
                //res.redirect('/membersonly/users/myprofile');    
                res.render('rate', {message: "regeister as: " + req.session.userId});  
              }
            });
        });
        }//end of unique check
      });
    });      
});

////////=======================
////SIGN OUT!!!//
Users.route("/signout/?")
  .get(function(req, res, next) {
    req.session.isLoggedIn  = false;
    req.session.userId      = null;
    res.redirect("/users/signin");
  });

////////=======================
Users.route('/?')
  // GET /
.get(function(req, res, next) {
  User.find(function(err, users) { //first thing is Error and second thing is all users within user database
    console.log(users);  
    //console.log(err);
    res.json(users); 
    //res.render('users', {user: users, isLoggedIn: req.session.isLoggedIn ? true : false});     
  });
})

module.exports = Users;
