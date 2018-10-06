var express   = require('express'),
    Friends  = express.Router(),
    fs        = require('fs'),
    mongoose  = require('mongoose'),
    Friend   = require('../models/friend');
var    User   = require('../models/user');

 


Friends.route('/search/?')
.post(function(req, res) {
  console.log("Searching for friend: " + req.body.username);
  console.log(req.body);



  ///full word match
  // Friend.find({$text: {$search: req.body.username}}, function(err, friends) { //Find ALL things within database
  //   // res.json(friends);
  //   res.render('results', {items: friends})
  // });


  User.find({username: { "$regex": req.body.username, "$options": "i" }}, function(err, users) { 
    // res.json(friends);
    users.sort(function(a,b){
      return a.username - b.username;
    })
    res.render('results', {items: users})
  });



          ////works for partial word matches!!!
  Friend.find({name: { "$regex": req.body.username, "$options": "i" }}, function(err, friends) { 
    // res.json(friends);
    console.log("Inside friend find")
    friends.sort(function(a,b){
      return a.username - b.username;
    })
    res.render('results', {items: friends})
  });

});



///////////
////
Friends.route('/rate/?')
.get(function(req, res) {
  //console.log(req);
  var message = "couldnt find user";
  Friend.find({friender: req.body.frienderId}).
  populate('friender').
  populate('friendee').
  exec(function (err,friends){
    
    //res.render('rate', {friends: friends, userId: req.session.userId,  username: friends[0].user.username });

  });
});


Friends.route('/json/:frienderId')
.get(function(req, res) {
  //console.log(req);
  // Friend.find(function(err, friends) { //Find ALL things within database
  //   res.json(friends);
  // });
  var frienderId = req.params.frienderId;
  Friend.find({friender: frienderId}).
  populate('friender').
  populate('friendee').
  exec(function (err,friends){
    
    //res.render('rate', {friends: friends, userId: req.session.userId,  username: friends[0].user.username });
    res.json(friends);
  });




});

///////
Friends.route('/:frienderId/?')
.get(function(req, res) {
  //console.log(req.params);
  var frienderId = req.params.frienderId;
  //console.log(id);
  // Friend.findById(id, function(err, friends) { //Find single thing
  //   res.json(friends);
  // });
  Friend.find({$or: [{friender: frienderId}, {friendee: frienderId}]}).
  populate('friender').
  populate('friendee').
  exec(function (err,friends){
    
    res.render('friends', {items: friends});
    //res.json(friends);
  });


});
/////
/////root/friend/new/...
Friends.route('/new/?')
.post(function(req, res) {
  
  
  User.findOne({username: req.body.username.toLowerCase()}, function(err, foundUser) { 
    if(req.session.userId == foundUser._id){

      Friend.find()
      .populate('friender')
      .populate('friendee')
      .exec(function (err,friends){
        res.render('user_search_results', {friends: friends, message: "You can't friend yourself"}); 
      });
    }
    else{
      var entry = {
        status: "Pending",
        friender: req.session.userId,
        friendee: foundUser._id
      };  
      Friend.create(entry, function(err, friend) {
        console.log("FRIENDSHIP: " + friend);
        res.redirect("/friend/");
      })
    }
  });
  
});





/////root/friend/...
Friends.route('/?')
.get(function(req, res) {
  Friend.find( {$or: [{friender: req.session.userId}, {friendee: req.session.userId}]}).
  populate('friender').
  populate('friendee').
  exec(function (err,friends){    
    res.render('friends', {friends: friends, userId: req.session.userId, username: req.session.username });
    //res.json(friends);
  });
    ///////////////////
    ///////////////////
})

  ///////FOR ADDING friend
.post(function(req, res) {
  console.log(Friend.printStuff("yeeha"));
  User.findOne({username: req.body.username}, function(err, foundUser) { 
    console.log("===========FOUND USER ========");
    console.log(foundUser);
    if(req.session.userId == foundUser._id){

      Friend.find()
      .populate('friender')
      .populate('friendee')
      .exec(function (err,friends){
        res.render('user_search_results', {friends: friends, message: "You can't friend yourself"}); 
      });
    }
    // else{
    //   var entry = {
    //     status: "Pending",
    //     friender: req.session.userId,
    //     friendee: foundUser._id
    //   };  

    //   console.log(entry.friender, entry.friendee);
    //   console.log("============================");
    //   console.log("Running checkIfFriends=====>");
    //   Friend.checkIfFriends(entry.friender, entry.friendee, function(err, docs) {
    //     console.log(docs);
    //     console.log("Array length: " + docs.length);
    //   });

    //   // Friend.create(entry, function(err, friend) {
    //   //   console.log("FRIENDSHIP: " + friend);
    //   //   res.redirect("/friend/");
    //   // })
    //     Friend.findOneAndUpdate({friender: req.session.userId, friendee: foundUser._id}, entry, {upsert:true, fields: {}},function(err, doc) {
    //     if(err){
    //       return res.status(500).send({error: err});
    //     }
    //     return res.redirect("/friend/");
    //     })
    // }
    else{     /////////else # 2!!!!   
      console.log("Running checkIfFriends=====>");
      Friend.checkIfFriends(req.session.userId, foundUser._id, function(err, doc) {
        if (doc) {
          var update = {
            status: req.body.status? req.body.status : "Pending"
          };  
          console.log(doc);
          Friend.findOneAndUpdate({_id: doc._id}, update, {upsert:true},function(err, doc) {
          if(err){
            return res.status(500).send({error: err});
          }
          return res.redirect("/friend/");
          })

        } 
        else {
          console.log("New FRIENDSHIP");
          var entry = {
            status: "Pending",
            friender: req.session.userId,
            friendee: foundUser._id
          };

          Friend.create(entry, function(err, friend) {
            console.log("FRIENDSHIP: " + friend);
            res.redirect("/friend/");
          })
        }        
      });


        
    }




  });  
})
.delete(function(req, res, next) {
  var id = req.body.id;
  Friend.findByIdAndRemove(id, function(err, game) {
    res.json({message: "Deleted entry: @ id: " + id});
  });
})

.put(function(req, res, next) {
  Friend.remove({}, function(err) {
    if (err) {
      console.log(err)
    } else {
      res.end('successful PURGING');
    }     
  }); 
})

.patch(function(req, res) {
   ///////FOR LOADING TEST / SEED ENTRIES 
 
  Friend.create(testEntries, function(err, friends) {
    //console.log(friends);
    //res.json(friends);
    res.json({message: "SEEDs successful"});
  });
});  
  /////////END OF TESTING POST METHOD
module.exports = Friends;
