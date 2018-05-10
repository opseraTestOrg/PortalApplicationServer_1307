var customerAppAccount = require('../models/customerappaccountmodel');
const uuidv4 = require('uuid/v4');
var Request = require("request");
var email = require('../utilities/email');
var docker = require('docker-api')({ socketPath: false, host: 'http://localhost', port: '4243'});

function createCustomerAppAccount(params, callback) {
    console.log("inside createCustomerAppAccount");
    var customerAppAct = new customerAppAccount({
        uniqueAppId: uuidv4(),
        bundleType: params.customerBundleType,
        organizationName: params.customerOrganizationName,
        address: params.customerAddress,    
        primaryContactEmail: params.customerPrimaryContactEmail,    
        primaryContactPhone: params.customerPrimaryContactPhone,
        secondaryContactEmail: params.customerSecondaryContactEmail,    
        secondaryContactPhone: params.customerSecondaryContactPhone,
        applicationUrl: params.customerApplicationUrl,
        applicationPortNo: params.customerApplicationPortNo,
        applicationTechnologyStack: params.customerApplicationTechnologyStack,
        toolsSelection: params.customerToolsSelection,
        customerUsers: params.customerUsers        
    });
    console.log(customerAppAct);
    customerAppAct.save(function(err, result) {
            if (err) {                
                callback(result, err);
                return err;
            }            
            callback(result, err);            
        });
};

function getCustomerAppAccount(appid, callback) {
    customerAppAccount.find({customerUniqueAppId: appid}, function(err, result) {
        if (err) {
            callback(result, err);
            return err;
        }
        callback(result, err);
    });
};

function installBundleForCustomer(body, callback){  
   // console.log(body.toolsList[0])
    var toolsList = [];
    var applicationId = uuidv4();
    var customerUniqueId = body.customerUniqueId;
    var applicationName = body.applicationName;
    var activatedURL = "";

    var activationText = "Thank You for choosing the "+body.bundleName+" for your "+ body.applicationName+" application."+
                         "Your installation would be ready within 1 hour. You would be notified with the installation status and URL's for your bundle."

  
    
    for(var i=0; i<body.toolsList.length;i++){
       
        var object = {
            toolName : body.toolsList[i].toolName,
            toolConfigurationList : body.toolsList[i].toolConfigurationList
        }    
        toolsList.push(object);
    }
   // console.log(toolsList);
   
    var application = {
        customerUniqueId : body.customerUniqueId,
        applicationId : applicationId,
        applicationName :body.applicationName,
        isEncryptionEnabled : body.isEncryptionEnabled,
        baseUrl : null,
        instanceId :null,
        bundleName : body.bundleName,
        toolsList : toolsList
    }
    function checkStatus(newInstanceId){
        console.log("Started checking status.. ");
        console.log(newInstanceId);
        Request.post({
                headers: { "content-type": "application/json" },
                url: "http://localhost:9091/api/customer/checkInstanceStatus/"+newInstanceId,
                json:true
            }, (error, response, baseUrl) => {    
                activatedURL = baseUrl;
                console.log(baseUrl);
                if(error) {
                    console.log("Error occured...!!!");
                    callback(body, error);
                }      
                customerAppAccount.findOneAndUpdate({'applications.applicationId':applicationId}, {$set: {'applications.$.baseUrl': baseUrl}},function(err, result){
                    if(err){
                        callback(result, err);
                        return err;
                    }
                }); 
                var toolInfo = "Your request for installation of "+body.bundleName+" was successfully installed. Your can access your tools as below with the respective credentials.\n"+
                "Artifactory  http://"+activatedURL+":5010"+"        Credentials: admin / password"+"\n"+
                "Jenkins      http://"+activatedURL+":5008"+"        Credentials: "+"\n"+
                "Nagios       http://"+activatedURL+":5009"+"        Credentials: nagiosadmin / nagios";
                email.sendmail(toolInfo,"","","",body.primaryContactEmail,"Activation Successful ..!!!");
                // Request.post({
                //     headers: { "content-type": "application/json" },
                //     url: "http://localhost:9091/api/customer/startContainers/"+baseUrl,
                //     json:true
                // }, (error, response) => {    
                   
                //     if(error) {
                //         console.log("Error occured...!!!");
                //         callback(body, error);
                //     }      
                //   // email.sendmail(toolInfo,"","","",body.primaryContactEmail,"Successful Activation..!!!");
                // });
            });
    }
   
        customerAppAccount.findOneAndUpdate({customerUniqueId:body.customerUniqueId}, {$push: {applications: application}},function(err, result){
            if(err){
                callback(result, err);
                return err;
            }
          
            email.sendmail(activationText,"","","",body.primaryContactEmail,"Bundle Activation Request");
            callback({'msg':"Activation request Received..!!!"},err);
            // Request.post({
            //     headers: { "content-type": "application/json" },
            //     url: "http://localhost:9091/api/customer/createNewEC2Instance",
                
            //     json:true
            // }, (error, response, instanceId) => {    
            //     if(error) {
            //         console.log("Error occured...!!!");
            //         callback(instanceId, error);
            //     }
            //     console.log("Instance Id is ");
                
            //     console.log(instanceId)       
            //     customerAppAccount.findOneAndUpdate({'applications.applicationId':applicationId}, {$set: {'applications.$.instanceId': instanceId}},function(err, result){
            //         if(err){
            //             callback(result, err);
            //             return err;
            //         }
            //       console.log(applicationId);
            //         setTimeout(checkStatus, 240000, instanceId);
                    
            //     });  
            //    // callback(body, error);
            // });
        });
       
    // Request.post({
    //     headers: { "content-type": "application/json" },
    //     url: "http://localhost:9091/api/customer/activatePackage",
    //     body:{
    //         customerId : body.customerUniqueId,
    //         bundleName : body.bundleName,
    //         applicationName : body.applicationName,
    //         isEncryptionEnabled : body.isEncryptionEnabled,
    //         toolList : body.toolsList
    //     },
    //     json:true
    // }, (error, response, body) => {    
    //     if(error) {
    //         console.log("Error occured...!!!");
    //         callback(body, error);
    //     }       
    //     callback(body, error);
    // });
};

function installDummyBundle(body, callback){
    var docker = require('docker-api')({ socketPath: false, host: 'http://ec2-18-219-89-27.us-east-2.compute.amazonaws.com', port: '4342'});
    function handler(err, res) {
        if (err) throw err;
        console.log("data returned from Docker as JS object: ", res);
    }
    
    var options = {}; // all options listed in the REST documentation for Docker are supported.
    
   console.log(docker.json)
    docker.containers.list(handler);

};

exports.getCustomerAppAccount = getCustomerAppAccount;
exports.createCustomerAppAccount = createCustomerAppAccount;
exports.installBundleForCustomer = installBundleForCustomer;
exports.installDummyBundle = installDummyBundle;