const express = require('express')
const router = express.Router()
const { authenticate } = require('../libs/authenticte')
const { AuthService } = require('../services/auth.service')

router.post('/register',(req,res)=>{
    const {account, password,email, name, phone} = req.body;
    AuthService.signUp(account,password, email, name, phone)
    .then(user=>res.send({
        code: 1,
        data: user,
        message: ''
    }))
    .catch(err=>res.send({
        code: 0,
        data: null,
        message:err.message
    }))
})

router.post('/signin',(req,res)=>{
    const {account, password} = req.body
    AuthService.signIn(account,password)
    .then(user => res.send({
        code: 1,
        data: user,
        message: ''
    }))
    .catch(err=> res.send({
        code: 0,
        data: null,
        message: err
    }))
})

router.post('/signinToken',(req,res)=>{
    const {jwt} = req.body
    AuthService.signInToken(jwt)
    .then(user => res.send({
        code: 1,
        data: user,
        message: ''
    }))
    .catch(err=> res.send({
        code: 0,
        data: null,
        message: err.message
    }))
})


module.exports = router