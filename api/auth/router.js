const express = require('express');
const router = express.Router();
const authController = require('./controller');

router.get('/', (req, res) =>{
    res.render('user/login', {data: {}})
})

router.post('/', (req, res) =>{
    authController.login(req.body)
    .then(userInfo =>{
        if(userInfo){
            req.session.user = userInfo;
            res.redirect('/user/dashboard')
        }
        else{
            console.log('123')
            res.redirect('/auth')
        }
    })
    .catch((err) => {
        res.send(err)
    })
})

router.get('/logout', (req, res) =>{
    req.session.destroy()
    res.redirect('/auth')
})

module.exports = router