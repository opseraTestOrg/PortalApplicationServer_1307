var restify = require('restify');
var mongoose = require('mongoose');
var Routes = require('./routes');

var portno = process.env.PORT || '3000';

mongoose.connect('mongodb://localhost:27017/opseradb');

const server = restify.createServer({
 name: 'OpseraAppServer',
 version: '1.0.0'
});

server.use(
    function crossOrigin(req,res,next){
      res.header("Access-Control-Allow-Origin", "true");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      return next();
    }
  );

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(portno, function () {
    //console.log(server);
    console.log('%s is listening at port : %s', server.name, portno);
});

// setup endpoints on the server

Routes.setupServerEndpoints(server);