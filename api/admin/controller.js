const adminModel = require('./model');

const createAdmin = (adminname, password) =>{
    return new Promise( (resolve, reject) =>{
        adminModel.create(adminname, password)
        .then(adminCreated => resolve(adminCreated))
        .catch(err => reject(err))
    })
}

const findAllAdmin = () =>{
    return new Promise( (resolve, reject) =>{
        adminModel.find()
        .then(admins => resolve(admins))
        .catch(err => reject(err))
    })
};

const findOneAdmin = (adminname) =>{
    return new Promise( (resolve, reject) =>{
        adminModel.findOne(adminname)
        .then(adminFound => resolve(adminFound))
        .catch(err => reject(err))
    })
}
 
module.exports = {createAdmin, findAllAdmin, findOneAdmin}