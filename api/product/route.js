const express = require("express");
const router = express.Router();
const productController = require('./controller')
const mongoose = require("mongoose");
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


router.post('/', upload.single('prd_image'), (req, res) =>{

  var img_path = req.file.path;
  var img_array = img_path.split('\\')
  img_array.splice(0, 1)
  img_name =  img_array.join('/')
  console.log(img_path)
  productController.createProduct( req.body, img_name)
  .then(data => res.send({sucess:1, data}))
  .catch(err => console.log(err))
})


router.post('/update/:prdId', upload.single('prd_image'), (req, res) =>{
  
  var img_path = req.file.path;
  var img_array = img_path.split('\\')
  img_array.splice(0, 1)
  img_name =  img_array.join('/')
  console.log(img_name)
  productController.updateProduct(req.params.prdId, req.body, img_name)
  .then(data => res.send(data))
  .catch(err => console.log(err))
})

router.post('/delete/:prdId', (req, res) =>{
  productController.deleteProduct(req.params.prdId)
  .then(data => res.send(data))
  .catch(err => console.log(err))
})

router.get('/', (req, res) =>{
  productController.getProductByPage(req.query.page || 1)
  .then(data => res.send(data))
  .catch(err => console.log(err))
})


module.exports = router  