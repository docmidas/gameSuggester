var express   = require('express'),
    Items  = express.Router(),
    fs        = require('fs'),
    mongoose  = require('mongoose'),
    Item   = require('../models/item');   
   
// var User   = require('../models/user'),
//     Game   = require('../models/game');

  
///////////
////
Items.route('/json/?')
.get(function(req, res) {
  //console.log(req);
  Item.find(function(err, items) { //Find ALL things within database
    res.json(items);
  });
});

///////
Items.route('/:id/?')
.get(function(req, res) {
  //console.log(req.params);
  var id = req.params.id;
  console.log(id);
  Item.findById(id, function(err, items) { //Find ALL things within database
    res.json(items);
  });
});

/////root/items/...
Items.route('/?')
.get(function(req, res) {
  Item.find(function(err, items) { //Find ALL things within database
    res.render('home', {items: items, message: "#: " + items.length});
    //res.send("Getting items");
  });
})

  ///////FOR ADDING THINGS
.post(function(req, res) {
  var entry = {
    geekId: req.body.geekId,
    userId: req.body.userId,
    score: req.body.score,
    status: req.body.status
  };
  Item.findOneAndUpdate({geekId: req.body.geekId, userId: req.body.userId}, entry, {upsert:true},function(err, doc) {
    if(err){
      return res.status(500).send({error: err});
    }
    return res.send("successfully saved");
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
    //console.log(items);
    //res.json(items);
    res.json({message: "SEEDs successful"});
  });
});  
  /////////END OF TESTING POST METHOD
module.exports = Items;
