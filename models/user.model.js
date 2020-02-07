const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    account:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    level: Number,
    avatar:{
        type: String,
        default:'user-default.png'
    },
    name: String,
    phone: String,
    card_id:{
        type: String,
        unique:true
    },
    motels:[{
        type: Schema.Types.ObjectId,
        ref:'motel'
    }],
    rooms:[{
        type: Schema.Types.ObjectId,
        ref:'room'
    }],
    address: String,
    job: String,
    sex: Boolean,
    birth_day: Date,
    deposit: Number,
    status: Boolean,
    star_date: Date,
    end_date: Date,
    create_date:{
        type: Date,
        default: Date.now
    },
    create_by: String
})
const UserModel = mongoose.model('user',UserSchema)

module.exports = { UserModel }