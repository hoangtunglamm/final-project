const orderModel = require('./model')


let findAllOrder = () =>{
    return new Promise( (resolve, reject) =>{
        orderModel.find({active:true})
        .then(orderFound => resolve(orderFound))
        .catch(err => reject(err))
    })
}

let createOrderTest = ({name, phone, address, mail}, prd_name) =>{
    return new Promise( (resolve, reject) =>{
        const order = new orderModel({
            name, phone, address, mail, prd_name
        })
        order.save()
        .then(orderCreated => resolve(orderCreated))
        .catch(err => console.log(err))
    })
}

const deleteOrder = (orderId) =>{
    return new Promise( (resolve, reject) =>{
     orderModel.findByIdAndUpdate(orderId, {active: false})
      .then(orderDelete => resolve(orderDelete._id))
      .catch(err => reject(err))
    })
  }
module.exports = { findAllOrder, createOrderTest, deleteOrder}