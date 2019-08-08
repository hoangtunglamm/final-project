const express = require('express');
const router = express.Router();
const productController = require('../product/controller')
const categoryController = require('../category/controller')
const sendMailController = require('./send_mail')
const nodemailer = require('nodemailer')
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

router.get('/send_mail/cart', async(req, res) =>{
  console.log(req.session.cart)
  let prdCart = req.session.cart
  let data = await Promise.all(prdCart.map(prdId => productController.findOneProduct(prdId)))
  console.log(data)
  const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'lamptit96@gmail.com',
		  pass: 'meyuptrmbhplvsnn'
		}
	  });
      let mail = [req.body.mail]
      let name = req.body.name
      let add = req.body.add
      let phone = req.body.phone

    
	  const mailOptions = {
		from: 'lam hoang',
		to: mail,
		subject: 'HTLam-project',
    text: `cam on ${name} dia chi ${add} sdt ${phone}`
    
	  };
	  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		  res.json(req.body)
		}
	  });
  res.send('ok')
})

module.exports = router