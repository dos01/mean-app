//store user data
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const config=require('../config/database');

//user schema
const UserSchema=mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

});

//use outside we use exports
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback); //mongoose function findby..
}

//email
module.exports.getUserByEmail = function(email, callback) {
    const query = {email: email} //query to find one
    User.findOne(query, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username} //query to find one
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

