const express = require('express');
const router = express.Router();
const authController = require('./controller');

router.post('/', (req, res) =>{
    console.log(req.body)
    authController.login(req.body)
    .then(userInfo =>{
        req.session.user = userInfo;
        res.send({success: 1, user: userInfo})
    })
    .catch(err => res.status(err.statusCode).send({success: 0, err: err.err}))
})

module.exports = router