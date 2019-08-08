const categoryModel = require('./model');

const createCategory = (name) =>{
    return new Promise( (resolve, reject) =>{
        categoryModel.create(name)
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}
const findAllCategory = () =>{
    return new Promise( (resolve, reject) =>{
        categoryModel.find()
        .then(catFound => resolve(catFound))
        .catch(err => reject(err))
    })
}

const findCategory = (someshit) =>{
    return new Promise( (resolve, reject) =>{
        categoryModel.find({name : someshit})  
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}

module.exports ={createCategory, findAllCategory, findCategory}