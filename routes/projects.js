const express=require('express');
const router=express.Router();
//const passport = require('passport');
//const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Project=require('../models/project');

/*
//retribing projects details
router.get('/projects' , (req, res, next) =>{
    // all the project will be save in project variable
    Project.getAllProjects((err, projects) => {
        res.json({success:true, projects: projects});
        //responding back to the client in json format
    })
});
*/

//Get project details
router.post('/project',(req,res,next)=>{

    let newProject = new Project ({
        name: req.body.name,
        Description: req.body.Description,
        startDate: req.body.startDate,
     //   people: req.body.people
    });

    Project.addProject(newProject, (err, user) => {
        if(err) {
            res.json({success: false, msg: 'Failed to add project'});
        } else {
            res.json({success: true, msg: 'Project added'});
        }
    });


});

module.exports=router;