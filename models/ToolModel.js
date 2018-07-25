var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var toolSchema = new Schema({
       toolName: {type: String, required: true},
       exposedPort: {type: String},
       toolContainerId:{type: String},
       dnsName:{type: String},
       instanceId:{type: String},
       instanceStatus:{type: String},
       toolStatus:{type: String},
       customerUniqueId:{type: String},
       applicationId:{type: String},
       customerName:{type: String},
       applicationName:{type: String}
});

module.exports = mongoose.model('customerTools', toolSchema);