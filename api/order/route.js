
const express = require('express')
const router = express.Router()

const orderController = require('./controller')

router.post('/', (req, res) =>{
    orderController.createOrder(req.body)
    .then(data => res.send(data))
    .catch(err => console.log(err)) 
})

router.get('/', (req, res) =>{
    orderController.findAllOrder()
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

module.exports = router