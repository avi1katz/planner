//server.js
'use strict'
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Task = require('./src/Model/Task');
var config = require('./src/config');
//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set
//it up, or 3001
var port = process.env.API_PORT || 3001;

//db config
mongoose.connect(config.mongoUri);
//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});
//adding the /tasks route to our /api router
router.get('/tasks/:date', function(req, res) {
  let d1 = new Date(req.params.date);
  d1.setHours(0,0,0,0)
  let d2 = new Date(d1);
  d2.setDate(d2.getDate() + 1);
  Task.find({
   'date': {'$gte': d1.toISOString(),'$lt': d2.toISOString()}},
   function(err, tasks) {
    if (err)
    res.send(err);
    //responds with a json object of our database comments.
    res.json(tasks)
  });
})

router.route('/tasks')
 //retrieve all tasks from the database
 .get(function(req, res) {
   //looks at our Task Schema
   Task.find(
    function(err, tasks) {
     if (err)
     res.send(err);
     //responds with a json object of our database tasks.
     res.json(tasks)
   });
 })
 //post new task to the database
 .post(function(req, res) {
   var task = new Task();
   //body parser lets us use the req.body
   task.user = req.body.user;
   task.date = req.body.date;
   task.startTime = req.body.startTime;
   task.activity = req.body.activity;
   task.completed = req.body.completed;
   task.save(function(err) {
     if (err)
     res.send(err);
     res.json({ message: 'Task successfully added!' });
   });
 });

 router.route('/task/:task_id')
 //The put method gives us the chance to update our task based on
 //the ID passed to the route
 .put(function(req, res) {
   Task.findById(req.params.task_id, function(err, task) {
     if (err)
     res.send(err);
     //setting the new task whatever was changed. If
     //nothing was changed we will not alter the field.
     ('user' in req.body) ? task.user = req.body.user : null;
     ('date' in req.body) ? task.date = req.body.date : null;
     ('startTime' in req.body) ? task.startTime = req.body.startTime : null;
     ('activity' in req.body) ? task.activity = req.body.activity : null;
     ('completed' in req.body) ? task.completed = req.body.completed : null;
     //save task
     task.save(function(err) {
       if (err)
       res.send(err);
       res.json({ message: 'Task has been updated' });
     });
   });
 })
 //delete method for removing a task from our database
 .delete(function(req, res) {
   //selects the task by its ID, then removes it.
   Task.remove({ _id: req.params.task_id }, function(err, comment) {
     if (err)
      res.send(err);
     res.json({ message: 'Task has been deleted' });
   });
 });
//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
