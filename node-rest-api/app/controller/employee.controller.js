const Employee = require('../models/employee.model.js');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

// Create and Save a new Employee
exports.createEmployee = async (req, res) => {
// Validate request
    if(!req.body.employeeId) {
        return res.status(400).send({
            message: "Employee ID can not be empty"
        });
    }

    //Check whether employee already in Database
    const emailExists = await Employee.findOne({
        email: req.body.email
    });

    if(emailExists) return res.status(400).send({
        message: 'Email already exists'
    });

    //Hash password and save
    bcrypt.hash(req.body.password, null, null,(err,hash) =>{
        if(err){
            return res.status(500).json({
                error : err
            });
        }
        else {
            const employee = new Employee({
                employeeId: req.body.employeeId,
                password: hash,
                name: req.body.name || "Untitled Employee", 
                email: req.body.email,
                phone: req.body.phone,
                role: req.body.role,
                managerId: req.body.managerId,
                orgName: req.body.orgName
        });
        employee
        .save()
        .then(result =>{
            res.status(201).json({
                message: "User Successfully Created"
            });
            console.log(employee);
        })
        .catch(err =>{
            res.status(500).json({
                message: err.message || "Some error occurred while creating the User."
            })
        });
        }
    })
};

// Retrieve and return all Employee from the database.
exports.findAllEmployee = (req, res) => {
    Employee.find()
    .then(employee => {
        res.send(employee);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving employee."
        });
    });
};

// Find a single Employee with a EmployeeId
exports.findOneEmployee = (req, res) => {
    Employee.find({employeeId: req.params.employeeId})
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee Details not found with id " + req.params.employeeId
            });            
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === req.params.odcId) {
            return res.status(404).send({
                message: "Employee Details not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Employee Details with id " + req.params.employeeId
        });
    });

};

// Update a Employee identified by the EmployeeId in the request
exports.updateEmployee = (req, res) => {
    // Validate Request
    if(!req.body.employeeId) {
        return res.status(400).send({
            message: "Employee ID can not be empty"
        });
    }

//Hash password and save
bcrypt.hash(req.body.password, null, null,(err,hash) =>{
    if(err){
        return res.status(500).json({
            error : err
        });
    }
// Find Employee and update it with the request body
    else {
Employee.updateOne({employeeId:req.params.employeeId}, {
        employeeId: req.body.employeeId || "Employee ID can not be empty ",
        password: hash,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
        managerId: req.body.managerId,
        orgName: req.body.orgName
    }, {new: true})
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'employeeId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Error updating Employee with id " + req.params.employeeId
        });
    });
} 
});
};

// Delete a Employee with the specified EmployeeId in the request
exports.deleteEmployee = (req, res) => {
    Employee.remove({employeeId:req.params.employeeId})
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });
        }
        res.send({message: "Employee deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Employee with id " + req.params.employeeId
        });
    });

};

//Authenticate Employee/Manager/User
exports.loginUser =  async (req,res) =>{
    const employee = await Employee.findOne({employeeId: req.body.employeeId});
    if(!employee) return res.status(400).json({
        message: 'employeeId is wrong'
    });

    bcrypt.compare(req.body.password, employee.password, (err, resp) =>{
        if(!resp){
            res.send("Invalid Password !!!")
        }
        else {       
            res.send('Logged In...');
        }
    })
};