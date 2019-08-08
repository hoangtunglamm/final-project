var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const categoryModel = new Schema({
   name: String
})

module.exports = mongoose.model('category', categoryModel)