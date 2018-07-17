var toolController = require('../controllers/toolController.js')

function saveTool(req, res, next){
     var jsonBody = req.body;
     toolController.saveTool(jsonBody, function(result, error){
        if (error) {
            res.send(400, { success: false, error: error });
            next();
        }
        else {            
            res.send(201, { success: true, data: result });
            next();
        }
     })
};

function updateDNS(req, res, next){
    var jsonBody = req.body;
    toolController.updateDNSName(jsonBody, function(result, error){
        if (error) {
            res.send(400, { success: false, error: error });
            next();
        }
        else {            
            res.send(200, { success: true, data: result });
            next();
        }
     })
};

function updateToolCOntainerID(req, res, next){
    var jsonBody = req.body;
    toolController.updateToolCOntainerID(jsonBody, function(result, error){
        if (error) {
            res.send(400, { success: false, error: error });
            next();
        }
        else {            
            res.send(200, { success: true, data: result });
            next();
        }
     })
};

function setupEndpoints(server) {    
    server.post({ path:'/saveTool', version: "1.0.0" }, saveTool);
    server.post({ path:'/updateDNS', version: "1.0.0"}, updateDNS);
    server.post({ path:'/updateToolContainerId', version: "1.0.0"}, updateToolCOntainerID);     
};

exports.setupEndpoints = setupEndpoints;