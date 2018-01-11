var toolsList = require('../models/toolslistmodel');

function createToolsList(params, callback) {
    var tools = new toolsList({
        toolCategory: params.toolCategory,
        toolName: params.toolName
    });
    tools.save(function(err, result) {
            if (err) {                
                callback(result, err);
                return err;
            }            
            callback(result, err);            
        });
}

function getToolsList(callback) {
    toolsList.find({}, function(err, result) {
        if (err) {
            callback(result, err);
            return err;
        }
        callback(result, err);
    });
}

exports.getToolsList = getToolsList;
exports.createToolsList = createToolsList;