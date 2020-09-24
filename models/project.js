const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const config=require('../config/database');

//projects schema
const PSchema=mongoose.Schema({
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
    EndDate:{
        type:String,
    },
    members:{
        type:String,
    },
    ownerId:{
        type:String,
    }
});

const Project = module.exports = mongoose.model('Project', PSchema);


module.exports.getProjectById = function(id, callback) {
    Project.findById(id, callback); //mongoose function findby..
}

module.exports.getProjectByName = function(name, callback) {
    const query = {name: name} //query to find one
    Project.findOne(query, callback);
}

module.exports.addProject = function(newProject, callback) {
    newProject.save(callback);
}

module.exports.getProjectsByUserName = function (name, callback) {
    const query = {users:name.name}
    Project.find(query,callback);

}