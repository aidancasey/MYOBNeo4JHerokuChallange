/**
 * Module dependencies.
 */

var express = require('express')  ;
var  routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
   // app.set('view engine', 'jade');     //screw Jade we don't need a templating engine !
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(require('stylus').middleware({ src: __dirname + '/public' }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/csv_data'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

app.helpers({
    title: 'MYOB Neo4J Heroku Challenge'
});

// Routes

//default page
app.get('/', function (req, res) {
    console.log("reguest for / came in");
    res.sendfile(__dirname + '/views/index.html');
});

app.get('/admin/deleteAllNodes', routes.admin.deleteAll);
app.get('/import/batchImport', routes.import.importFiles);
app.get('/import/createIndividual', routes.import.createIndividual);
app.get('/import/addRelationships', routes.import.addRelationships);



/*app.get('/users', routes.users.list);
app.post('/users', routes.users.create);
app.get('/users/:id', routes.users.show);
app.post('/users/:id', routes.users.edit);
app.del('/users/:id', routes.users.del);

app.post('/users/:id/follow', routes.users.follow);
app.post('/users/:id/unfollow', routes.users.unfollow);*/

app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);