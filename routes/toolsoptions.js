var toolsListController = require('../controllers/toolslistcontroller.js');

function createToolsList(req, res, next) {
    var jsonBody = req.body;

    /*
    if (!Application.verifyParameters(params, ["date", "users"])) {
        res.send(400, { success: false, error: "missing parameter" });
        next();
        return;
    }
    */
    
    toolsListController.createToolsList(jsonBody, function(result, error) {
        if (error) {
            res.send(400, { success: false, error: error });
            next();
        }
        else {            
            res.send(201, { success: true, data: result });
            next();
        }
    });
    

    //console.log(jsonBody);
    //res.send(201, { success: true, data: "ok" });
}

function getToolsList(req, res, next) {
   // var jsonBody = req.body;

    /*
    if (!Application.verifyParameters(params, ["date", "users"])) {
        res.send(400, { success: false, error: "missing parameter" });
        next();
        return;
    }
    */    
    toolsListController.getToolsList(function(result, error) {       
        if (error) {
            res.send(400, { success: false, error: error });
            next();
        }
        else {            
            res.send(201, { success: true, data: result });
            next();
        }
    })
    

    //console.log(jsonBody);
    //res.send(201, { success: true, data: "ok" });
}

function setupEndpoints(server) {    
    server.post({ path: '/tools', version: "1.0.0" }, createToolsList);
    server.get ({ path: '/tools', version: "1.0.0" }, getToolsList);
}

exports.setupEndpoints = setupEndpoints;