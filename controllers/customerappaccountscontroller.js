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
}

function getCustomerAppAccount(appid, callback) {
    customerAppAccount.find({customerUniqueAppId: appid}, function(err, result) {
        if (err) {
            callback(result, err);
            return err;
        }
        callback(result, err);
    });
}

function installBundleForCustomer(params, callback){
    var customerId = params.customerId;
    var packageName = params.bundleName;

   console.log(customerId +" ---- "+packageName)

Request.post({
    "headers": { "content-type": "application/json" },
    "url": "http://localhost:9091/api/customer/activatePackage/"+customerId+"/"+packageName
}, (error, response, body) => {
   
    if(error) {
        console.log("Error occured...!!!")
        return console.dir(error);
    }
    console.dir(body);
});
}

exports.getCustomerAppAccount = getCustomerAppAccount;
exports.createCustomerAppAccount = createCustomerAppAccount;
exports.installBundleForCustomer = installBundleForCustomer;