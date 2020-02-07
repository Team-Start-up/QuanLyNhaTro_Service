const mongoose = require('mongoose')
const Schema = mogoose.Schema

const BillSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'room'
    },
    total: Number,
    create_date: {
        type: Date,
        default: Date.now
    },
    bill_details: [{
        type: Schema.Types.ObjectId,
        ref:'bill_details'
    }]
})

const BillModel = mongoose.model('bill',BillSchema)

module.exports = {BillModel}