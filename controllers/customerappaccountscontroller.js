var customerAppAccount = require('../models/customerappaccountmodel');
const uuidv4 = require('uuid/v4');

function createCustomerAppAccount(params, callback) {
    console.log("inside createCustomerAppAccount");
    var customerAppAct = new customerAppAccount({
        customerUniqueAppId: uuidv4(),
        customerBundleType: params.customerBundleType,
        customerOrganizationName: params.customerOrganizationName,
        customerAddress: params.customerAddress,    
        customerPrimaryContactEmail: params.customerPrimaryContactEmail,    
        customerPrimaryContactPhone: params.customerPrimaryContactPhone,
        customerSecondaryContactEmail: params.customerSecondaryContactEmail,    
        customerSecondaryContactPhone: params.customerSecondaryContactPhone,
        customerApplicationUrl: params.customerApplicationUrl,
        customerApplicationPortNo: params.customerApplicationPortNo,
        customerApplicationTechnologyStack: params.customerApplicationTechnologyStack,
        customerToolsSelection: params.customerToolsSelection,
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

exports.getCustomerAppAccount = getCustomerAppAccount;
exports.createCustomerAppAccount = createCustomerAppAccount;