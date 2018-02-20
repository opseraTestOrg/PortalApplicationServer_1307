var customerAppAccount = require('../models/customerappaccountmodel');
const uuidv4 = require('uuid/v4');


function registerCustomer (jsonBody, callback){

console.log("Registering.....")
    var customerPersonalObject = new Object({
        firstName: jsonBody.firstName,
        lastName: jsonBody.lastName,
        emailId: jsonBody.emailId, 
        loginId: jsonBody.emailId
    });
    var customerObject = new customerAppAccount({
        uniqueAppId: uuidv4(),
        organizationName: jsonBody.organizationName,
        address: jsonBody.address, 
        zip:jsonBody.zip,
        state:jsonBody.state,
        primaryContactEmail: jsonBody.emailId,    
        primaryContactPhone: jsonBody.primaryContactPhone,
        secondaryContactPhone: jsonBody.secondaryContactPhone,
        customerUsers: customerPersonalObject
    });
    customerObject.customerUsers[0].loginPassword=customerObject.generateHash(jsonBody.loginPassword);
    customerObject.save(function(err, result) {
        if (err) {                
            callback(result, err);
            return err;
        }            
        callback(result, err);            
    });
};

function login(jsonBody, callback){
    
    customerAppAccount.findOne({'primaryContactEmail':jsonBody.emailId}, function(err, customer){
        if (err) {                
            callback(result, err);
            return err;
        } 
        if(customer){
           if(customer.validatePassword(jsonBody.loginPassword)){
                callback(customer.toJSON(),err);
           }else{
                callback({'msg':"Invalid Credentials..!!!"},err);
           }
        }else{
            callback({'msg':"email not found..!!!"},err);
        }
    });
};

function checkUserExistence(params, callback){
    customerAppAccount.findOne({'primaryContactEmail':params.emailId}, function(err, customer){
        if (err) {                
            callback(result, err);
            return err;
        } 
       
         callback({isUserExists:customer==null?false:true},err)
        
    });
}

exports.registerCustomer = registerCustomer;
exports.login= login;
exports.checkUserExistence= checkUserExistence;
