var express   = require('express'),
    Users  = express.Router(),
    fs        = require('fs'),
    mongoose  = require('mongoose'),
    User   = require('../models/user'),
    bcrypt = require('bcrypt');

 var Item   = require('../models/item');  
    // var Gift        = require(__dirname + '/../models/gift');
///////////
////SUCCESFUL LOGIN OR SIGN UP LEADS HERE
Users.route('/signin/?')
  .get(function(req, res, next) {    
    if(req.session.userId) {
      res.redirect('/item/rate/');
    }else{
      res.render('signin');
      //res.redirect('/user/signin/')
    }    
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
            req.session.userId      = user._id;
            req.session.username = user.username;
            res.redirect('/item/rate/');

          } else {
            res.render('signin', {message: "Wrong Password"});
          }
        })
      }
    })
  });
///////////////

Users.route('/signout/?')
.get(function(req, res, next) {
  req.session.userId      = null;
  req.session.username = null;
  res.redirect("/user/signin/");
})

Users.route('/register/?')
// GET /
// -----
// Serve the homepage
.get(function(req, res, next) {
  if(req.session.userId) {
    res.redirect('/item/rate/');
  }else{
    res.render('register');
  }
  
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
                req.session.userId      = user._id;
                req.session.username    = user.username;
                console.log("Session USER ID HAS BEEN SET: " + req.session.userId );
                //res.redirect('/membersonly/users/myprofile');    
                //res.render('rate', {message: "register as: " + req.session.userId});
                res.redirect('/item/rate/');
              }
            });
        });
      }//end of unique check
    });
  });      
});
//////////==================
Users.route('/search/?')
.get(function(req, res, next) {    
  res.render("user_search_results", {userId: req.session.userId});
})
//
.post(function(req, res, next) {
  req.body.username = req.body.username.toLowerCase();
  User.find({username: { "$regex": req.body.username, "$options": "i" }}, function(err, users) { 
    if(users){
      users.sort(function(a,b){
            return a.rank - b.rank;
          })
          res.render('user_search_results', {userId: req.session.userId, users: users, message: "used User controller"});
          //res.render('rate', {items: items, userId: req.session.userId,  username: items[0].user.username });
    }
    else{
      res.render('user_search_results', {message: "No users by that name"});
    }  

  });    
});


////////=======================
Users.route('/search/:username/?')
.get(function(req, res, next) {  
  var username = req.params.username;
  User.findOne({username: username}, function(err, user) { //Find single user
    if(user){
      //res.json(user);
      //res.render('profile', {username: username, })
      Item.find({userId: user._id}).
        // populate('user').
      populate('game').
      exec(function (err,items){
        
        console.log(items);
        // res.render('profile', {items: items, username: username});
        res.render('rate', {items: items, username: username});
      });
    }
    else{
      res.render('user_search_results', {message: "No users by that name"});
    }  
  });     
});

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
