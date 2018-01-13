var bundleController = require('../controllers/bundlecontroller.js');

function createBundle(req, res, next) {
    var jsonBody = req.body;        
    bundleController.createBundle(jsonBody, function(result, error) {
        if (error) {
            res.send(400, { success: false, error: error });
            next();
        }
        else {            
            res.send(201, { success: true, data: result });
            next();
        }
    })
}

function getAllBundles(req, res, next) {       
    bundleController.getAllBundles(function(result, error) {       
        if (error) {
            res.send(400, { success: false, error: error });
            next();
        }
        else {            
            res.send(201, { success: true, data: result });
            next();
        }
    }) 
}

function setupEndpoints(server) {    
    server.post({ path: '/bundle', version: "1.0.0" }, createBundle);
    server.get ({ path: '/bundles', version: "1.0.0" }, getAllBundles);
}

exports.setupEndpoints = setupEndpoints;