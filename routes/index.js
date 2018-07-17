// require other routes
var toolsOptions = require('./toolsoptions.js');
var customerAccounts = require('./customerappaccounts.js');
var bundleDefinition = require('./bundledefinition.js');
var loginNRegister = require('./loginNRegister.js');
var tool = require('./tool.js')
function setupServerEndpoints (server) {

  toolsOptions.setupEndpoints(server);
  customerAccounts.setupEndpoints(server);
  bundleDefinition.setupEndpoints(server);
  loginNRegister.setupEndpoints(server);
  
  tool.setupEndpoints(server);
  server.get('/echo/:name', function (req, res, next) {
    res.send(req.params);
    return next();
   });

  server.get({ path: '/ping', version: "1.0.0" }, function (req, res, next) {
    res.send(200, { ping: 'pong' });
  });

}

exports.setupServerEndpoints = setupServerEndpoints;
