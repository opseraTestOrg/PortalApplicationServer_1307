var customerToolHistory = require('../models/CustomerToolHistory');
var customerToolHistoryController = require ('../controllers/CustomerToolHistoryController');

function saveToolHistory( json, callback){
    customerToolHistoryController.addToolToCustomerHistory(req.body, function(result, error){
        if (error) {
            res.send(400, { success: false, error: error });
            next();
        }
        else {  
            if(result.isApplicationExists){
                res.send(500, { success: true, data: result });
            }          
            else{
                res.send(200, { success: true, data: result });
            }
           
            next();
        }
    });
};

function setupEndpoints(server) {    
    server.post({ path:'/addToolToHistory', version: "1.0.0" }, saveToolHistory);
    
};

exports.setupEndpoints = setupEndpoints;