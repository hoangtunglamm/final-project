
const express = require('express')
const router = express.Router()

const orderController = require('./controller')
const productController = require('../product/controller')

router.get('/', (req, res) =>{
    orderController.findAllOrder()
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

router.post('/', async(req, res) =>{
    let prdCart = req.session.cart
    console.log(prdCart)
    let data = await Promise.all(prdCart.map(prdId => productController.findOneProduct(prdId)))
    let prd_name_list = []
    for(i in data){
        prd_name_list.push(data[i].prd_name)
    }
    let result = await Promise.all(prd_name_list.map(prd_name => orderController.createOrderTest(req.body, prd_name)))
    res.redirect('/')
})

module.exports = router