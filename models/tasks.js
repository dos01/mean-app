const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const config=require('../config/database');

//users tasks schema
const TsSchema=mongoose.Schema({
    name:{
        type:String,
    },
    Description:{
        type:String,
        required:true
    },
    startDate:{
        type:String,
        required:true
    },
   endDate:{
        type:String,
        required:true
    },
    pid:{
        type:String,
    },

});

const Ts = module.exports = mongoose.model('Tasks', TsSchema);


module.exports.getTaskbyId = function(id, callback) {
    Ts.findById(id, callback); //mongoose function findby..
}

module.exports.getTaskbyName = function(name, callback) {
    const query = {name: name} //query to find one
    Ts.findOne(query, callback);
}

module.exports.addTask = function(newTask, callback) {
    newTask.save(callback);
}