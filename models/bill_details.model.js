const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BillDetailsSchema = new Schema({
    service_details:[{
        type: Schema.Types.ObjectId,
        ref: 'service_details'
    }],
    create_date: {
        type: Date,
        default: Date.now
    }
})