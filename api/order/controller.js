const orderModel = require('./model')

let createOrder = ({name, phone, address, mail}) =>{
    return new Promise( (resolve, reject) =>{
        orderModel.create({name, phone, address, mail})
        .then(orderCreated => resolve(orderCreated))
        .catch(err => reject(err))
    })
}
let findAllOrder = () =>{
    return new Promise( (resolve, reject) =>{
        orderModel.find()
        .then(orderFound => resolve(orderFound))
        .catch(err => reject(err))
    })
}
module.exports = {createOrder, findAllOrder}