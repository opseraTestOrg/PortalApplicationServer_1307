// require other routes
var toolsOptions = require('./toolsoptions.js');
var customerToolsOptions = require('./customertoolsselections.js');


function setupServerEndpoints (server) {

  toolsOptions.setupEndpoints(server);
  customerToolsOptions.setupEndpoints(server);

  server.get('/echo/:name', function (req, res, next) {
    res.send(req.params);
    return next();
   });

  server.get({ path: '/ping', version: "1.0.0" }, function (req, res, next) {
    res.send(200, { ping: 'pong' });
  });

}

exports.setupServerEndpoints = setupServerEndpoints;
