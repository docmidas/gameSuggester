var mongoose = require('mongoose');

//var connectionString = process.env.NODE_ENV === 'production' ? 'mongodb://subzero:Password1@ds011820.mlab.com:11820/gimedatabase' : 'mongodb://localhost/gimeUsers';

var connectionString = 'mongodb://localhost/scrappyDb';


mongoose.connect(connectionString);

mongoose.connection.on("connected", function() {
  console.log("mongoose connected to: " + connectionString);
});

mongoose.connection.on("error", function(err) {
  console.log("HEYO mongoose failed to connect to: " + connectionString);
});

mongoose.connection.on("disconnected", function() {
  console.log("mongoose has been disconnected from: " + connectionString);
});


