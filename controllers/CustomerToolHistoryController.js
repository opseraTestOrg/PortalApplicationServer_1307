var customerToolHistory = require('../models/CustomerToolHistory');
var toolModel = require('../models/ToolModel');
var async = require("async");
var Request = require("request");

function addToolToCustomerHistory( jsonBody, callback){
    var toolsList = jsonBody.toolsList;
    var applicationId = jsonBody.applicationId;
    for(var i=0; i < toolsList.length; i++){
        var tool = new customerToolHistory(toolsList[i]);
      //  console.log(applicationId +" name "+tool.toolName)
        toolModel.find({$and:[{'applicationId':applicationId},{'toolName':tool.toolName}]},function(err, result){
           var toolToSend = result[0];
            saveHistory(result[0],callback,function(err, result){
                console(result);
                
                if (err) {
                    callback(err, result);
                    return err;
                }else{
                    callback(result);
                }
            });
        });
    };   
};

 function saveHistory(tool,callback){
     var toolObject = tool.toObject();
     delete toolObject._id;
     var toolHistory = new customerToolHistory(toolObject);
     
     toolHistory.save(function(err, result){
            if (err) {
               //callback(err, result);
                return err;
            }else{
                toolHistory.installationType = "UPGRADE";
                Request.post({
                    headers: { "content-type": "application/json" },
                    url: "http://localhost:9091/api/rabbitmq/customerRequestHandler/addToToolContainerQueue",
                    body: toolHistory,
                    json: true
                }, (error, response, body) => {
                    if (error) {
                        console.log("Error occured...!!!");
                        callback(body, error);
                    }
                //  callback(body, error);
                });
            }
        });
};

exports.addToolToCustomerHistory = addToolToCustomerHistory;
