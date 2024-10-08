const mongoose = require('mongoose');

let mongoUrl = "mongodb+srv://vincentkiathadi:YIfp7gktEi2USAWW@cluster0.nt2oupy.mongodb.net/MimpiIndonesia?retryWrites=true&w=majority";

mongoose.connect(`${mongoUrl}`);

let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: Number
})

mongoose.model('users', userSchema);
module.exports = mongoose.model('users')