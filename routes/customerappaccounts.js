var custAppAccountsController = require('../controllers/customerappaccountscontroller.js');

function createCustomerAppAccount(req, res, next) {
    var jsonBody = req.body;

    /*
    if (!Application.verifyParameters(params, ["date", "users"])) {
        res.send(400, { success: false, error: "missing parameter" });
        next();
        return;
    }
    */
    
    custAppAccountsController.createCustomerAppAccount(jsonBody, function(result, error) {
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

function getCustomerAppAccount(req, res, next) {
   // var jsonBody = req.body;

    /*
    if (!Application.verifyParameters(params, ["date", "users"])) {
        res.send(400, { success: false, error: "missing parameter" });
        next();
        return;
    }
    */    
    var id = req.params.id;
    custAppAccountsController.getCustomerAppAccount(id, function(result, error) {       
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
    server.post({ path: '/customerappaccount', version: "1.0.0" }, createCustomerAppAccount);
    server.get ({ path: '/customerappaccount/:id', version: "1.0.0" }, getCustomerAppAccount);
}

exports.setupEndpoints = setupEndpoints;