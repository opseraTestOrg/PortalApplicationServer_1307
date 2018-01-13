var bundleModel = require('../models/bundlemodel');

function createBundle(params, callback) {
    var bundle = new bundleModel({
        bundleName: params.bundleName,
        bundleTools: params.bundleTools
    });
    bundle.save(function(err, result) {
            if (err) {                
                callback(result, err);
                return err;
            }            
            callback(result, err);            
        });
}

function getAllBundles(callback) {
    bundleModel.find({}, function(err, result) {
        if (err) {
            callback(result, err);
            return err;
        }
        callback(result, err);
    });
}

exports.getAllBundles = getAllBundles;
exports.createBundle = createBundle;