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
    toolModel.findOneAndUpdate({$and:[{customerUniqueId: jsonBody.customerUniqueId},{applicationId: jsonBody.applicationId},{toolName:jsonBody.toolName},{}]},{$set: { dnsName: jsonBody.dnsName } },function(err, result){
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
    toolModel.findOneAndUpdate({$and:[{customerUniqueId: jsonBody.customerUniqueId},{applicationId: jsonBody.applicationId},{toolName:jsonBody.toolName},{}]},{$set: { toolContainerId: jsonBody.toolContainerId }},function(err, result){
        if (err) {
            callback(result, err);
            return err;
        }else{
            callback(result);
        }
    });

};

function updateToolStatus ( jsonBody, callback){
    var tool = new toolModel();
    toolModel.findOneAndUpdate({$and:[{customerUniqueId: jsonBody.customerUniqueId},{applicationId: jsonBody.applicationId},{toolName:jsonBody.toolName},{}]},{$set: { toolStatus: jsonBody.toolStatus } },function(err, result){
        if (err) {
            callback(result, err);
            return err;
        }else{
            callback(result);
        }
    });
};



function getApplicationsByUser (jsonBody, callback){
    console.log(jsonBody.customerUniqueId);
    toolModel.find({
       'toolName' : "Artifactory"
       
    }, function(results, err ){
        console.log(results);
        if (err) {
            console.log(">>>>>>>>>>>>>>>>>>>>")
            callback({}, err);
            return err;
        }else{
            console.log("<<<<<<<<<<<<<<<<")
            callback(results);
        }
    })
};

exports.saveTool = saveTool;
exports.updateDNSName = updateDNSName;
exports.updateToolCOntainerID = updateToolCOntainerID;
exports.updateToolStatus = updateToolStatus;
exports.getApplicationsByUser = getApplicationsByUser;