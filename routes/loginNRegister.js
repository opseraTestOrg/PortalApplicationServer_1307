var loginNRegisterController =  require('../controllers/loginNRegisterController.js');


function registerCustomer(req, res, next){
    console.log(req.body)
    loginNRegisterController.registerCustomer(req.body, function(result, error){
        if (error) {
            res.send(400, { success: false, error: error });
            next();
        }
        else {            
            res.send(201, { success: true, data: "Registration was successfull..!!" });
            next();
        }
    })
};

function login(req,res,next){
    console.log("logging in ");
    loginNRegisterController.login(req.body, function(result, error){
        if (error) {
            res.send(400, { success: false, error: error });
            next();
        }
        else {      
            if(result.msg == "Invalid Credentials..!!!"){
                res.send(400, { success: false, data: result });
                next();
            } else if(result.msg == "email not found..!!!")  {
                res.send(400, { success: false, data: result });
                next();
            }else{
                res.send(200, { success: true, data: result });
                next();
            }
            
        }
    });
}

function checkUserExistence(req, res, next){
    loginNRegisterController.checkUserExistence(req.params, function(result, error){
        if (error) {
            res.send(400, { success: false, error: error });
            next();
        }else{
            res.send(200, {success:true,data:result});
        }
    })
}


function setupEndpoints(server) {    
    server.post({ path: '/register', version: "1.0.0" }, registerCustomer);
    server.post({ path: '/login', version: "1.0.0" }, login);
    server.post({path:'/isUserExists/:emailId',version:"1.0.0"}, checkUserExistence);
}

exports.setupEndpoints = setupEndpoints;
