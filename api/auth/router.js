const express = require('express');
const router = express.Router();
const authController = require('./controller');

router.get('/', (req, res) =>{
    res.render('login', {data: {}})
})

router.post('/', (req, res) =>{
    authController.login(req.body)
    .then(userInfo =>{
        if(userInfo>0){
            req.session.user = userInfo;
            res.redirect('/user/dashboard')
        }
        else{
            res.redirect('/auth')
        }
    })
    .catch((err) => {
        res.render('login', {err})})
})

module.exports = router