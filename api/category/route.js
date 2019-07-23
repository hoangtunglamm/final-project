const express = require('express');
const router = express.Router();
const categoryController = require('./controller')
router.post('/', (req, res) =>{
    categoryController.createCategory(req.body)
    .then(categoryCreated => res.send(categoryCreated))
    .catch(err => console.log(err))
})

router.get('/find', (req, res) =>{
    categoryController.findOneCategory(req.body)
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

module.exports = router;