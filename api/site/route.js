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

router.get('/product/category/:name', (req, res) =>{
    let cat_name = req.params.name
    productController.getProductByCategory()
    .then( (results) =>{
      
      let data = []
      for(i in results) {
        if(results[i].category.name ==  cat_name){
          data.push(results[i])
        }
      }
      res.render('site/category', {data, start:1, rows: data.length})
    })
    .catch(err => console.log(err))
  })

router.get('/cart/:prdId', (req, res) =>{
  let prdId = req.params.prdId;
  if(!req.session.cart){
    req.session.cart = [prdId]
   }
   else{
     req.session.cart.push(prdId)
   }
   global.cart = req.session.cart;
   res.redirect(`/product/${req.params.prdId}`)
})

router.get('/cart',  async(req, res) =>{

  let prdCart = req.session.cart
  let data = await Promise.all(prdCart.map(prdId => productController.findOneProduct(prdId)))
  let price =  0;
  for(i in data){
    price += data[i].prd_price
  }

  res.render('site/cart', {data, price})
})



router.get('/cart/delete/:prdId', (req, res) =>{
  prdId = req.params.prdId
  console.log(cart)
  console.log(req.session.cart)
  req.session.cart = cart.splice(cart.indexOf(prdId), 1)
  res.redirect('/cart')
})

router.get('/product/:prdId', (req, res) =>{
  productController.findOneProduct(req.params.prdId)
  .then(data => res.render('site/product', {data}))
  .catch(err => console.log(err))
})  

// router.get('/search', (req, res) =>{
//    productController.getAllProduct() 
//    .then(results =>{
//     console.log(req.query.q)
//     let data = results.filter(item => item.prd_name.toLowerCase().includes(req.query.q))   
//     res.render('site/search', {data, start:1})
//    })
//    .catch(err => console.log(err))
// })
router.get('/search', async(req, res) =>{
   let searchResults = await productController.getAllProduct()  
   let data = searchResults.filter(item => item.prd_name.toLowerCase().includes(req.query.q)) 
        
   res.render('site/search', {data, start:1} )
})


module.exports = router