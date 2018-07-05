// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.use(bodyParser.urlencoded({ extended: true }));

var Gun = require("gun");
app.use(Gun.serve);
var gun = Gun({ file:".data/data.json", web: listener });

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
  response.sendFile(__dirname + '/public/index.html');
  //response.sendFile(__dirname + '/sample/index.html');
});

// endpoint to get all the dreams in the database
// currently this is the only endpoint, ie. adding dreams won't update the database
// read the sqlite3 module docs and try to add your own! https://www.npmjs.com/package/sqlite3
app.get('/getDreams', function(request, response) {
  db.all('SELECT * from Dreams', function(err, rows) {
    response.send(JSON.stringify(rows));
  });
});

// 
app.get('/hoge/:id', function(request, response) {
  db.run('INSERT INTO Dreams (dream) VALUES ("'+request.params.id+'")');
});


// get user data by id.
app.get('/user/:id', function(request, response) {
  let userId = request.params.id;
  let userData = gun.get('user').get('id').get(userId).back();
  console.log('userData:', userData);
  response.send(JSON.stringify(userData));
});

//gun.get('user').set(null);

var u = gun.get('user').get('Email').put({id:2, name:"foo", age:22});
console.log('user u:', u);
//gun.get('users').set(u);

var bob = gun.get('user').get('bob').put({name: "Bob"});
var dave = gun.get('user').get('dave').put({name: "Dave"});
dave.get('friends').set(bob);
bob.get('friends').set(dave);
console.log('friends:', bob);

let machines = gun.get('machines');
let machine = gun.get('machine/tesseract');
machine.put({faces: 24, cells: 8, edges: 32});
// let's add machine to the list of machines;
machines.set(machine);
// now let's remove machine from the list of machines
//machines.unset(machine);


