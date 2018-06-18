// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE Dreams (dream TEXT)');
    console.log('New table Dreams created!');
    
    // insert default dreams
    db.serialize(function() {
      db.run('INSERT INTO Dreams (dream) VALUES ("Find and count some sheep"), ("Climb a really tall mountain"), ("Wash the dishes")');
    });
  }
  else {
    console.log('Database "Dreams" ready to go!');
    db.each('SELECT * from Dreams', function(err, row) {
      if ( row ) {
        console.log('record:', row);
      }
    });
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// endpoint to get all the dreams in the database
// currently this is the only endpoint, ie. adding dreams won't update the database
// read the sqlite3 module docs and try to add your own! https://www.npmjs.com/package/sqlite3
app.get('/getDreams', function(request, response) {
  db.all('SELECT * from Dreams', function(err, rows) {
    response.send(JSON.stringify(rows));
  });
});

app.get('/hoge/:id', function(request, response) {
  db.run('INSERT INTO Dreams (dream) VALUES ("'+request.params.id+'")');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



var Gun = require( "gun" );

var gun = new Gun().get('thoughts');


//require( 'gun-file' );
//var gun = new Gun({
//  'file-name' : '.data/yourData.json',  // default is 'data.json6'
//  //'file-mode' : 666, // default is 0666
//  'file-pretty' : true, // default, if false, will write ugly/compressed json
//  'file-delay' : 100,  // default. control flush interval/delay default.
//});


var cat = {name: "Fluffy", species: "kitty"};
var mark = {boss: cat};
cat.slave = mark;
 
// partial updates merge with existing data!
gun.get('mark').put(mark);
 
// access the data as if it is a document.
gun.get('mark').get('boss').get('name').val(function(data, key){
  // `val` grabs the data once, no subscriptions.
  console.log("Mark's boss is", data);
});
 
// traverse a graph of circular references!
gun.get('mark').get('boss').get('slave').once(function(data, key){
  console.log("Mark is the slave!", data);
});
 
// add both of them to a table!
gun.get('list').set(gun.get('mark').get('boss'));
gun.get('list').set(gun.get('mark'));
 
// grab each item once from the table, continuously:
gun.get('list').map().once(function(data, key){
  console.log("Item:", data);
});
 
// live update the table!
gun.get('list').set({type: "cucumber", goal: "scare cat"});





var cat2 = {name: "Fluffy2", species: "kitty2"};
var mark2 = {boss: cat};
cat2.slave = mark;
 
// partial updates merge with existing data!
gun.get('mark2').put(mark2);