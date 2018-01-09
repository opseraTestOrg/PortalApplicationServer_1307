var customerToolsList = require('../models/customerToolsModel');

function createCustomerToolsSelection(params, callback) {
    console.log("inside createCustomerToolsController");
    console.log(params.customerId);
    var customerTools = new customerToolsList({
        customerId: params.customerId,
        saasPlatforms: params.saasPlatforms,
        configManagementTools: params.configManagementTools,
        cicdTools: params.cicdTools,
        logManagementTools: params.logManagementTools,
        repositoryManagementTools: params.repositoryManagementTools,
        monitoringTools: params.monitoringTools
    });
    console.log(customerTools);
    customerTools.save(function(err, result) {
            if (err) {                
                callback(result, err);
                return err;
            }            
            callback(result, err);            
        });
}

function getCustomerToolsSelection(custid, callback) {
    customerToolsList.find({customerId: custid}, function(err, result) {
        if (err) {
            callback(result, err);
            return err;
        }
        callback(result, err);
    });
}

exports.getCustomerToolsSelection = getCustomerToolsSelection;
exports.createCustomerToolsSelection = createCustomerToolsSelection;