var customerToolsController = require('../controllers/customertoolscontroller.js');

function createCustomerToolsSelection(req, res, next) {
    var jsonBody = req.body;

    /*
    if (!Application.verifyParameters(params, ["date", "users"])) {
        res.send(400, { success: false, error: "missing parameter" });
        next();
        return;
    }
    */
    
    customerToolsController.createCustomerToolsSelection(jsonBody, function(result, error) {
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

function getCustomerToolsSelection(req, res, next) {
   

    /*
    if (!Application.verifyParameters(params, ["date", "users"])) {
        res.send(400, { success: false, error: "missing parameter" });
        next();
        return;
    }
    */

    var custid = req.params.id;
    console.log(custid);
    
    customerToolsController.getCustomerToolsSelection(custid, function(result, error) {       
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
    server.post({ path: '/customertools', version: "1.0.0" }, createCustomerToolsSelection);
    server.get ({ path: '/customertools/:id', version: "1.0.0" }, getCustomerToolsSelection);
}

exports.setupEndpoints = setupEndpoints;