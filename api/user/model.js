var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const userModel = new Schema({
    username: String,
    password: String
})
userModel.pre("save", function(next) {
  const saltRounds = 10;
  const plainPassword = this.password;
  bcrypt.genSalt(saltRounds)
    .then(salt => bcrypt.hash(plainPassword, salt))
    .then(hashPassword =>{
      this.password = hashPassword;
      next();

    })
    .catch(err => next(err))
  });
module.exports = mongoose.model('user', userModel)