var express   = require('express'),
    Users  = express.Router(),
    fs        = require('fs'),
    mongoose  = require('mongoose'),
    User   = require('../models/user');
    // var Gift        = require(__dirname + '/../models/gift');
///////////
////SUCCESFUL LOGIN OR SIGN UP LEADS HERE

////==Route: root/membersonly/users
Users.route('/?')
  .get(function(req, res) {
    User.find(function(err, users) { //first thing is Error and second thing is all users within user database
      console.log(users);  
      //console.log(err);
      res.json(users); 
      //res.render('users', {user: users, isLoggedIn: req.session.isLoggedIn ? true : false});     
    })
  });
module.exports = Users;
