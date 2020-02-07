const mongoose = require('mongoose')
const Schema = mogoose.Schema

const ServiceDetailsSchema = new Schema({
    service: [{
        type: Schema.Types.ObjectId,
        ref: 'service'
    }],
    room: {
        type: Schema.Types.ObjectId,
        ref: 'room'
    },
    money: Number,
    status: Boolean
})

const ServiceDetailsModel = mongoose.model('service_details',ServiceDetailsSchema)

module.exports = {ServiceDetailsModel}