const express = require('express')
const router = express.Router()


router.post('/create-motel', (req,res)=>{
    let mt =  {author, motel_name, description, address, county, city, district, qty_room};
    mt = req.body;

})