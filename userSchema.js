const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: Number
})

mongoose.model('users', userSchema);
module.exports = mongoose.model('users')