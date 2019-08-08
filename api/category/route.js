const express = require('express');
const router = express.Router();
const categoryController = require('./controller');
const catModel = require('./model')
router.post('/', (req, res) =>{
    categoryController.createCategory(req.body)
    .then(categoryCreated => res.send(categoryCreated))
    .catch(err => console.log(err))
})


router.get('/', (req, res) =>{
    categoryController.findAllCategory()
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

router.get('/testFind/:name', (req, res) =>{
    categoryController.findCategory(req.params.name)
    .then(data => res.send(data))
    .catch(err => console.log(err))
})
module.exports = router;