var express   = require('express'),
    Items  = express.Router(),
    fs        = require('fs'),
    mongoose  = require('mongoose'),
    Item   = require('../models/item');  

  
///////////
////
Items.route('/rate/?')
.get(function(req, res) {
  var message = "couldnt find user";
  Item.find({userId: req.session.userId}).
  populate('user').
  populate('game').
  exec(function (err,items){    
    res.render('rate', {items: items, userId: req.session.userId,  username: req.session.username });
  });
});


Items.route('/json/?')
.get(function(req, res) {
  Item.find(function(err, items) { //Find ALL things within database
    res.json(items);
  });
});

///////
Items.route('/:id/?')
.get(function(req, res) {
  var id = req.params.id;
  Item.findById(id, function(err, items) { //Find single thing
    res.json(items);
  });
});

/////root/item/...
Items.route('/?')
.get(function(req, res) {
  Item.find(function(err, items) { //Find ALL things within database
    res.render('home', {items: items, message: "#: " + items.length});
  });
})

  ///////FOR ADDING or UPdating item
.post(function(req, res) {
  var entry = {
    rating: req.body.rating,
    status: req.body.status,
    user: req.session.userId,
    game: req.body._id
  };
  /// create new record if new, otherwise update
  Item.findOneAndUpdate({game: req.body._id, userId: req.session.userId}, entry, {upsert:true},function(err, doc) {
  if(err){
    return res.status(500).send({error: err});
  }
  return res.redirect("/item/rate/");
  })   
})

.delete(function(req, res, next) {
  var id = req.body.id;
  Item.findByIdAndRemove(id, function(err, game) {
    res.json({message: "Deleted entry: " + game.name + " @ id: " + id});
  });
})

.put(function(req, res, next) {
  Item.remove({}, function(err) {
    if (err) {
      console.log(err)
    } else {
      res.end('successful PURGING');
    }     
  }); 
})

.patch(function(req, res) {
   ///////FOR LOADING TEST / SEED ENTRIES 
 
  Item.create(testEntries, function(err, items) {
    //res.json(items);
    res.json({message: "SEEDs successful"});
  });
});  
  /////////END OF TESTING POST METHOD
module.exports = Items;
