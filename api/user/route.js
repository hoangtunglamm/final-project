const express = require('express');
router = express.Router();
const userController = require('./controller');
const categoryController = require('../category/controller')
const productController = require('../product/controller')
const productModel = require('../product/model')
const multer = require('multer');
const orderController = require('../order/controller')
const siteSendMail = require('../site/send_mail')

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/uploads/');
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + file.originalname); 
  }
})
const upload = multer({storage:storage})


router.post('/', (req, res) =>{
    userController.createUser(req.body)
    .then(data => res.send(data))
    .catch(err => console.log(err))
});

router.get('/dashboard', (req, res) =>{
    res.render('user/dashboard')
})


router.get('/product', (req, res)=>{
    productController.getAllProduct()
    .then( (rs) =>{
        pageLength = rs.length
        page = parseInt(req.query.page) || 1
        perPage = 6
        var number_page = Math.ceil(pageLength/perPage);	
		var page_prev, page_next;
		page_prev = page - 1;
		if(page_prev == 0){
				page_prev = 1;
		}
		page_next = page + 1;
		if(page_next > number_page){
				page_next = number_page;
		}
        productController.getProductByPage(page, perPage)
        .then( (data) =>{
            res.render('user/product', {data, number_page, page_next, page_prev})                        
        })
        .catch(err => console.log(err))
    })
  
})
router.get('/product/add', (req, res) =>{      
    categoryController.findAllCategory()
    .then((categories) =>{
        res.render('user/add_product', {categories})
    })
    .catch(err => console.log(err))
})
router.post('/product/add', upload.single('prd_image'), (req, res) =>{
    var img_path = req.file.path;
    console.log(img_path)
    var img_array = img_path.split('\\')
    img_array.splice(0, 1)
    img_name =  img_array.join('/')
    
    productController.createProduct( req.body, img_name)

    res.redirect('/user/product')
});

router.get('/product/edit/:prdId', (req, res) =>{
    productController.findOneProduct(req.params.prdId)
    .then(prdFound =>{
        categoryController.findAllCategory()
        .then((categories) =>{
            res.render('user/edit_product', {categories, prdFound})
        })
    })
   
    .catch(err => console.log(err))
})
router.post('/product/edit/:prdId', upload.single('prd_image'), (req, res) =>{
    var img_path = req.file.path;
    console.log(img_path)
    var img_array = img_path.split('\\')
    img_array.splice(0, 1)
    img_name =  img_array.join('/')
    productController.updateProduct(req.params.prdId, req.body, img_name)
    res.redirect('/user/product')
})

router.get('/product/del/:prdId', (req, res) =>{
    productController.deleteProduct(req.params.prdId)
    res.redirect('/user/product')
})

router.get('/order', (req, res) =>{
    orderController.findAllOrder()
    .then((data) => {
        console.log(data)
        res.render('user/order', {data})
    })
    .catch(err => console.log(err))
})

router.get('/order/del/:orderId', (req, res) =>{
    orderController.deleteOrder(req.params.orderId)
    res.redirect('/user/order')
})

router.get('/order/send_mail/:mail', (req, res) =>{

    siteSendMail.sendMailOder(req.params.mail)
    res.send('mail send')
})
module.exports = router