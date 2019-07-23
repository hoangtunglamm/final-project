const userModel = require('./model');

const createUser = (username, password) =>{
    return new Promise( (resolve, reject) =>{
        userModel.create(username, password)
        .then(userCreated => resolve(userCreated))
        .catch(err => reject(err))
    })
}

const findAllUser = () =>{
    return new Promise( (resolve, reject) =>{
        userModel.find()
        .then(users => resolve(users))
        .catch(err => reject(err))
    })
};

const findOneUser = (username) =>{
    return new Promise( (resolve, reject) =>{
        userModel.findOne(username)
        .then(userFound => resolve(userFound))
        .catch(err => reject(err))
    })
}
 
module.exports = {createUser, findAllUser, findOneUser}