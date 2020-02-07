const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/db_motel',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(()=> console.log('Db Connect'))
.catch(err=> console.log(err.message))