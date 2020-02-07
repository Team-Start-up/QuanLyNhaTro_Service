const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MotelSchema = new Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    motel_name:{
        type: String,
        required: true
    },
    description: String,
    address: String,
    county:String,
    city:String,
    district:String,
    rooms:[{
        type: Schema.Types.ObjectId,
        ref:'room'
    }],
    qty_room:Number,
    status: Boolean
})
const MotelModel = mongoose.model('motel', MotelSchema);

module.exports = { MotelModel }