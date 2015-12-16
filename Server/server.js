var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var TodoApp = require('./generated/todoapp');

var router = express.Router();

var app = express();

app.use(bodyParser.json());

var server = app.listen(3000, function() {
  console.log('Listening in on 3000...');
})

var TodoSchema = new mongoose.Schema({
  id: Number,
  note: String,
  completed: Boolean
});

var Todo = mongoose.model('Todo', TodoSchema);


mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var id = 0;
db.once('open', function (callback) {
  console.log('open!');
})

router.use(express.static(path.join(__dirname + '/../client/dist')));

router.get('/', function(req, res) {
  res.send(path.join(__dirname, '../client/dist/index.html'))
})

router.get('/todos', function(req, res, next) {
  Todo.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

id = 3;

router.post('/todos', function(req, res, next) {
  Todo.create({id: id++, note: req.body.todo, completed: false}, function (err, todo) {
    if (err) return next(err);
    res.json(todo);
  });
});

router.post('/update/:id', function(req, res, next) {
  console.log(req.params.id);
  var id = req.params.id;
  Todo.findOne({id: id}, 'completed', function(err, todo) {
    if (err) return next(err);
    Todo.findOneAndUpdate({id: id}, {completed: !todo.completed}, function(err, todo) {
      if (err) return next(err);
      res.json(todo);
    })
  })
})

app.use('/', router);
