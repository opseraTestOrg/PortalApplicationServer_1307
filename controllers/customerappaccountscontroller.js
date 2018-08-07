var customerAppAccount = require('../models/customerappaccountmodel');
const uuidv4 = require('uuid/v4');
var Request = require("request");
var email = require('../utilities/email');
var tooHistoryController = require ('../controllers/CustomerToolHistoryController');


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
    customerAppAct.save(function (err, result) {
        if (err) {
            callback(result, err);
            return err;
        }
        callback(result, err);
    });
};

function getCustomerAppAccount(appid, callback) {
    customerAppAccount.find({ customerUniqueAppId: appid }, function (err, result) {
        if (err) {
            callback(result, err);
            return err;
        }
        callback(result, err);
    });
};


function checkAndCreateApplication(body, callback){

    customerAppAccount.find({$and:[{ customerUniqueId: body.customerUniqueId },{ applications : {$elemMatch : { applicationName : body.applicationName}} }]}, function (err, result) {
        if (err) {
            callback(result, err);
            return err;
        }
        console.log(result.length)
        if(result.length>0){
            callback({isApplicationExists:true},err);
        }else{

            callback({applicationId : uuidv4(),customerUniqueId: body.customerUniqueId}, err);
        }
       
    });
};

function installBundleForCustomer(body, callback) {
    if(body.toolsList.length==0){
        callback("",{'msg' : 'Tools details missing'})
    }else{
     
    var toolsList = [];
    var applicationId = body.applicationId;
    var customerUniqueId = body.customerUniqueId;
    var applicationName = body.applicationName;
    var activatedURL = "";

    var activationText = "Thank You for choosing the " + body.bundleName + " for your " + body.applicationName + " application." +
        "Your installation would be ready within 1 hour. You would be notified with the installation status and URL's for your bundle."



    
    // console.log(toolsList);

    var application = {
        customerUniqueId: body.customerUniqueId,
        applicationId: applicationId,
        applicationName: body.applicationName,
        isEncryptionEnabled: body.isEncryptionEnabled,
        bundleName: body.bundleName,
        toolsList: body.toolsList

    };


    customerAppAccount.findOneAndUpdate({ customerUniqueId: body.customerUniqueId }, { $push: { applications: application } }, function (err, result) {
        if (err) {
            callback(result, err);
            return err;
        }

      

        for (var i = 0; i < body.toolsList.length; i++) {

            var object = {
                toolName : body.toolsList[i].toolName,
                toolConfigurationList : body.toolsList[i].toolConfigurationList,
                exposedPort : body.toolsList[i].toolConfigurationList[0].configurationValue,
                dnsName:"",
                instanceId:"",
                toolStatus:"",
                customerUniqueId:body.customerUniqueId,
                applicationId:applicationId,
                toolContainerId:"",
                bundleToolsSize:body.toolsList.length,
                applicationName: body.applicationName,
                customerName :body.customerName,
                installationDate : Date.now(),
                installationType : "INSTALL",
                isEncrypted : body.toolsList[i].isEncrypted,
                toolURL : body.toolsList[i].toolURL 
            }
            Request.post({
                headers: { "content-type": "application/json" },
                url: "http://localhost:9091/api/rabbitmq/customerRequestHandler/addToStartInstancesQueue",
                body: object,
                json: true
            }, (error, response, body) => {
                if (error) {
                    console.log("Error occured...!!!");
                    callback(body, error);
                }
              //  callback(body, error);
            });
           
        }
        callback({ 'msg': "Activation request Received..!!!" });
    });
    }
};

function updateTools(body, callback){
     
    if(body.toolsList.length==0){
        callback("",{'msg' : 'Tools details missing'});
    }else{
        //save history
        tooHistoryController.addToolToCustomerHistory(body,callback);        
        callback({'msg' : 'Tool/s update request for your '+body.applicationName+' application is received'});
    }   
};

exports.getCustomerAppAccount = getCustomerAppAccount;
exports.createCustomerAppAccount = createCustomerAppAccount;
exports.installBundleForCustomer = installBundleForCustomer;
exports.checkAndCreateApplication = checkAndCreateApplication;
exports.updateTools = updateTools;