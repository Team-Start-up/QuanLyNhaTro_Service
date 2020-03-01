const express = require('express')
const router = express.Router()
const {MotelService} = require('../services/motel.service')

router.post('/create-motel', (req,res)=>{
    const {author, motel_name, description, address, county, city, district, qty_room} = req.body;
    MotelService.create_motel(author, motel_name, description, address, county, city, district, qty_room)
    .then(motel=>res.send({
        code: 1,
        data: motel,
        message:''
    }))
    .catch(err=>res.send({
        code:0,
        data:null,
        message:err.message
    }))
})

module.exports = router
