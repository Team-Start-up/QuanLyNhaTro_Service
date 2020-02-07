const { verify } = require('./jwt')

function authenticate( req, res, next ){
    const { token } = req.headers
    verify( token )
    .then(obj => {
        req.idUser = obj._id
        next()
    })
    .catch(err=>res.send({
        code:0,
        data:null,
        message:err.message
    }))
}

module.exports = { authenticate }