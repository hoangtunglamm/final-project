const express = require('express');
const router = express.Router();
const productController = require('../product/controller')


router.get('/', (req, res) =>{
    productController.getProductFeatured()
    .then((prdFeatured) =>{
        productController.getProductLastest()
        .then((prdLastest) =>{
            res.render('site/index', {prdFeatured, prdLastest, start:1})
        })
    })
    
})

module.exports = router