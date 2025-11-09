const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    phoneNumber: {type: String, required: true},
    address: {type:String, required:true},
    role:{type:String, enum:['user','admin'], default:'user'},
    createdAt:{type:Date, default:Date.now}
})

const User = mongoose.model('User', UserSchema);
module.exports = User;