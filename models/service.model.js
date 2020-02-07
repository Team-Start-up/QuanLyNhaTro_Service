const mongoose = require('mongoose')
const Schema = mogoose.Schema

const ServiceSchema = new Schema({
    name: String,
    description: String,
    status: Boolean,
})
const ServiceModel = mongoose.model('service',ServiceSchema)

module.exports = {ServiceModel}
