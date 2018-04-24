var customerAppAccount = require('../models/customerappaccountmodel');
const uuidv4 = require('uuid/v4');
var Request = require("request");

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
    for(var i=0; i<body.toolsList.length;i++){
        console.log(body.toolsList[i])
        var object = {
            toolName : body.toolsList[i].toolName,
            toolConfigurationList : body.toolsList[i].toolConfigurationList
        }    
        toolsList.push(object);
    }
    console.log(toolsList)
    var application = {
        customerUniqueId : body.customerUniqueId,
        applicationId : uuidv4(),
        applicationName :body.bundleName,
        isEncryptionEnabled : body.isEncryptionEnabled,
        baseUrl : null,
        instanceId :null,
        bundleName : body.bundleName,
        toolsList : toolsList
    }
    customerAppAccount.find({customerUniqueId:body.customerUniqueId}, function(err, result) {
        if (err) {
            callback(result, err);
            return err;
        }
        customerAppAccount.findOneAndUpdate({customerUniqueId:body.customerUniqueId}, {$push: {applications: application}},function(err, result){
            if(err){
                callback(result, err);
                return err;
            }
        });
       console.log(result)
    });
    Request.post({
        headers: { "content-type": "application/json" },
        url: "http://localhost:9091/api/customer/activatePackage",
        body:{
            customerId : body.customerUniqueId,
            bundleName : body.bundleName,
            applicationName : body.applicationName,
            isEncryptionEnabled : body.isEncryptionEnabled,
            toolList : body.toolsList
        },
        json:true
    }, (error, response, body) => {    
        if(error) {
            console.log("Error occured...!!!");
            callback(body, error);
        }       
        callback(body, error);
    });
};

exports.getCustomerAppAccount = getCustomerAppAccount;
exports.createCustomerAppAccount = createCustomerAppAccount;
exports.installBundleForCustomer = installBundleForCustomer;