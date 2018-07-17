var toolModel = require('../models/ToolModel.js');

function saveTool (jsonBody, callback){
    var tool = new toolModel(jsonBody);
    tool.save(function(err, result) {
        if (err) {                
            callback(result, err);
            return err;
        }            
        callback(result, err);            
    });
};

function updateDNSName (jsonBody, callback){
    var tool = new toolModel();
    toolModel.findOneAndUpdate({$and:[{customerUniqueId: jsonBody.customerUniqueId},{toolName:jsonBody.toolName},{}]},{$set: { dnsName: jsonBody.dnsName } },function(err, result){
        if (err) {
            callback(result, err);
            return err;
        }else{
            callback(result);
        }
    });

};

function updateToolCOntainerID (jsonBody, callback){
    var tool = new toolModel();
    toolModel.findOneAndUpdate({$and:[{customerUniqueId: jsonBody.customerUniqueId},{toolName:jsonBody.toolName},{}]},{$set: { toolContainerId: jsonBody.toolContainerId } },function(err, result){
        if (err) {
            callback(result, err);
            return err;
        }else{
            callback(result);
        }
    });

};

exports.saveTool = saveTool;
exports.updateDNSName = updateDNSName;
exports.updateToolCOntainerID = updateToolCOntainerID;