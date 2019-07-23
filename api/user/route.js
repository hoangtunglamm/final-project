const express = require('express');
router = express.Router();
const userController = require('./controller')
const productController = require('../product/controller')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/uploads/');
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + file.originalname); 
  }
})
const upload = multer({storage:storage})


// router.post('/', (req, res) =>{
//     userController.createUser(req.body)
//     .then(data => res.send(data))
//     .catch(err => console.log(err))
// });

// router.get('/', (req, res) =>{
//     userController.findAllUser()
//     .then(data => res.send(data))
//     .catch(err => console.log(err))
// })

// router.get('/find', (req, res ) =>{
//     userController.findOneUser(req.body)
//     .then(data => res.send(data))
//     .catch(err => console.log(err))
// })

router.get('/dashboard', (req, res) =>{
    res.render('dashboard')
})

router.get('/product', (req, res) =>{
    var page = req.query.page;
   
    productController.getProductByPage(page|| 1)
    .then((data )=>{ 
        res.render('product', {data})})
    .catch(err => console.log(err))
})

router.get('/product/add', (req, res) =>{      
    res.render('add_product')
})
router.post('/product/add/:catId', upload.single('prd_image'), (req, res) =>{
    var img_path = req.file.path;
    var img_array = img_path.split('\\')
    img_array.splice(0, 1)
    img_name =  img_array.join('/')
    
    productController.createProduct(req.params.catId, req.body, img_name)
    .then((data) => {
        res.redirect('/user/product'), {data}
    })
    .catch(err => console.log(err))
});

router.get('/product/edit/:prd_id', (req, res) =>{
    res.render('add_product')
})
router.post('/product/edit/:prd_id', (req, res) =>{
    res.render('add_product')
})

router.get('/product/del/:prd_id', (req, res) =>{
    res.redirect('/user/product')
})





module.exports = router