var toolsList = require('../models/toolslistmodel');

function createToolsList(params, callback) {
    console.log("inside createToolsList controller");
    console.log(params.saasPlatforms)
    var tools = new toolsList({
        saasPlatforms: params.saasPlatforms,
        configManagementTools: params.configManagementTools,
        cicdTools: params.cicdTools,
        logManagementTools: params.logManagementTools,
        repositoryManagementTools: params.repositoryManagementTools,
        monitoringTools: params.monitoringTools
    });
    console.log(tools);
    tools.save(function(err, result) {
            if (err) {                
                callback(result, err);
                return err;
            }            
            callback(result, err);            
        });
}

function getToolsList(callback) {
    toolsList.find({}, function(err, result) {
        if (err) {
            callback(result, err);
            return err;
        }
        callback(result, err);
    });
}

exports.getToolsList = getToolsList;
exports.createToolsList = createToolsList;