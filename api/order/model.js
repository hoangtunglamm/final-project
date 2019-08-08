var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const orderModel = new Schema({
   name: {type: String},
   phone: {type: Number},
   address: {type: String},
   mail: {type: String},
   active: {type: Boolean, default:true},
   prd_name: {type: String}
})

module.exports = mongoose.model('order', orderModel)