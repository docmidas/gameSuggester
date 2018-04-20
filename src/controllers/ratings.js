var express   = require('express'),
    Ratings  = express.Router(),
    fs        = require('fs'),
    mongoose  = require('mongoose'),
    Rating = require('../models/rating')
    User   = require('../models/user'),
    Game   = require('../models/game');
    // var Gift        = require(__dirname + '/../models/gift');
///////////
////==Route: root/membersonly/users
Ratings.route('/json/?')
.get(function(req, res) {
  //console.log(req);
  Rating.find(function(err, ratings) { //Find ALL things within database
    res.json(ratings);
  });
});
///////
Ratings.route('/id/:id/?')
.get(function(req, res) {
  //console.log(req.params);
  var id = req.params.id;
  console.log(id);
  Rating.findById(id, function(err, ratings) { //Find ALL things within database
    res.json(ratings);
  });
});
/////root/ratings/...
Ratings.route('/?')
.get(function(req, res) {
  Rating.find(function(err, ratings) { //Find ALL things within database
    res.render('home', {ratings: ratings, message: "#: " + ratings.length});
    //res.send("Getting ratings");
  });
})
  ///////FOR ADDING THINGS
.post(function(req, res) {
  var entry = {
    geekId: req.body.geekId,
    userId: req.body.userId,
    score: req.body.score
  };
  Rating.findOneAndUpdate({geekId: req.body.geekId, userId: req.body.userId}, entry, {upsert:true},function(err, doc) {
    if(err){
      //return res.send(500, {error: err});  ///deprecated
      return res.status(500).send({error: err});
    }
    return res.send("successfully saved");
    //console.log(res.headers);
    res.end();// DEXX, is this necessary?
  })
})
.delete(function(req, res, next) {
  var id = req.body.id;
  Rating.findByIdAndRemove(id, function(err, game) {
    res.json({message: "Deleted entry: " + game.name + " @ id: " + id});
  });
})
.put(function(req, res, next) {
  Rating.remove({}, function(err) {
    if (err) {
      console.log(err)
    } else {
      res.end('successful PURGING');
    }     
  }); 
})
.patch(function(req, res) {
   ///////FOR LOADING TEST / SEED ENTRIES 
 
  Rating.create(testEntries, function(err, ratings) {
    //console.log(ratings);
    //res.json(ratings);
    res.json({message: "SEEDs successful"});
  });
});  
  /////////END OF TESTING POST METHOD
module.exports = Ratings;
