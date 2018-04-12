var express   = require('express'),
    Games  = express.Router(),
    fs        = require('fs'),
    mongoose  = require('mongoose'),
    Game   = require('../models/game');
//////////////////////
////////////ROUTES
//////////

Games.route('/json/?')
.get(function(req, res) {
  //console.log(req);
  Game.find(function(err, games) { //Find ALL things within database
    res.json(games);
  });
});
/////root/games/...
Games.route('/?')
.get(function(req, res) {
  Game.find(function(err, games) { //Find ALL things within database
    res.render('home', {games: games});
    //res.send("Getting games");
  });
})
  ///////FOR ADDING THINGS
.post(function(req, res) {
  var entry = {
    geekId: req.body.geekId,
    name: req.body.name,
    minPlyr: req.body.minPlyr,
    maxPlyr: req.body.maxPlyr,
    minTime: req.body.minTime,
    maxTime: req.body.maxTime,
    yearPub: req.body.yearPub,
    imgUrl: req.body.imgUrl,
    description: req.body.description,
    rank: req.body.rank,
    weight: req.body.weight,
    mechanics: req.body.mechanics,
    categories: req.body.categories,
    designers: req.body.designers,
    artists: req.body.artists,
    publishers: req.body.publishers,
    families: req.body.families
  };
  Game.findOneAndUpdate({geekId: req.body.geekId}, entry, {upsert:true},function(err, doc) {
    if(err){
      //return res.send(500, {error: err});  ///deprecated
      return res.status(500).send({error: err});
    }
    return res.send("successfully saved");
    //console.log(res.headers);
    //res.end();// DEXX, is this necessary?
  })
})
.delete(function(req, res, next) {
  var id = req.body.id;
  Game.findByIdAndRemove(id, function(err, game) {
    res.json({message: "Deleted entry: " + game.name + " @ id: " + id});
  });
})
.put(function(req, res, next) {
  Game.remove({}, function(err) {
    if (err) {
      console.log(err)
    } else {
      res.end('successful PURGING');
    }     
  }); 
})
.patch(function(req, res) {
   ///////FOR LOADING TEST / SEED ENTRIES 
  var testEntries = [
    {                    
      geekId: 
      name: 
      minPlyr: 
      maxPlyr: 
      minTime: 
      maxTime: 
      yearPub: 
      imgUrl: 
      description: 
      rank: 
      weight: 
      mechanics: 
      categories: 
      designers: 
      artists: 
      publishers: 
      families: 
    }
  ];
  Game.create(testEntries, function(err, games) {
    //console.log(games);
    //res.json(games);
    res.json({message: "SEEDs successful"});
  });
});  
  /////////END OF TESTING POST METHOD

module.exports = Games;