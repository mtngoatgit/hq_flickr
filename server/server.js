var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');

var massive = require('massive');
var connectionString = "postgres://postgres@localhost/flickrdb";

var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + './../public'));

var massiveInstance = massive.connectSync({
  connectionString : connectionString,
  scripts: '/Users/aMoveableFeast/devProjects/hq_flickr/server/db'});
app.set('db', massiveInstance);
var db = app.get('db');

app.post('/photos/:id', function(req, res) {
      request.get({ url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1dd17dde0fed7286935d83875fcc17dd&extras=description,date_taken,tags&text=" + req.params.id + "&format=json&nojsoncallback=1"}, function(error, response, body) {
          if (!error) {
            var body = JSON.parse(body);
            var photos = body.photos.photo;
          }
            for(var i = 0; i < photos.length; i++){
              var items = [
                photos[i].id,
                photos[i].owner,
                photos[i].secret,
                photos[i].server,
                photos[i].farm,
                photos[i].title,
                photos[i].description,
                photos[i].date_taken,
                req.params.id
              ]
              db.add_photos(items, function (err, response){
                res.status(200);
              });
            }
            items == undefined ? res.send("not found") : res.sendStatus(200);
     })
  })

  app.get('/photos/:id', function(req, res, next){
    db.get_photos(req.params.id, function(err, response){
      res.send(response);
    })
  })

app.listen(3000, function(){
  console.log('listening on port 3000')
})
