const UserModel = require('./model');

const createCategory = (name, test) =>{
    return new Promise( (resolve, reject) =>{
        UserModel.create(name, test)
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}
const findOneCategory = (name) =>{
    return new Promise( (resolve, reject) =>{
        UserModel.findOne(name)
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}

module.exports ={createCategory, findOneCategory}