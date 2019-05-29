const Request = require('../models/request.model.js');
const mongoose = require('mongoose');

// Create and Save a new Request
exports.createRequestList = async (req, res) => {

    // Validate request
    if(!req.body.reqId) {
        return res.status(400).send({
            message: "Request ID can not be empty"
        });
    }

    //Check whether requestId already in Database
    const requestExists = await Request.findOne({
        reqId: req.body.reqId
    });

    if(requestExists) return res.status(400).send({
        message: 'Request already exists'
    });
    
    const request = new Request({
            reqId: req.body.reqId,
            employeeId: req.body.employeeId,
            odcId: req.body.odcId || "Empty OdcId", 
            projectId: req.body.projectId,
            justification: req.body.justification,
            status: req.body.status,
            requestedDates: req.body.requestedDates
    });
    request
        .save()
        .then(result =>{
            res.status(201).json({
                message: "Request Successfully Created"
            });
        })
        .catch(err =>{
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Request."
            })
        });
};

// Retrieve and return all Request from the database.
exports.getRequestList = (req, res) => {
    Request.find()
    .then(request => {
        res.send(request);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Requests."
        });
    });
};

// Find a single Request Details with a requestId
exports.getRequestDetailsById = (req, res) => {
    Request.find({reqId: req.params.reqId})
    .then(request => {
        if(!request) {
            return res.status(404).send({
                message: "Request Details not found with reqId " + req.params.reqId
            });            
        }
        res.send(request);
    }).catch(err => {
        if(err.kind === req.params.reqId) {
            return res.status(404).send({
                message: "Request Details not found with reqId " + req.params.reqId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Request Details with reqId " + req.params.reqId
        });
    });

};

// Find a single Request Details with a odcId
exports.getRequestDetailsByOdcId = (req, res) => {
    Request.find({odcId: req.params.odcId})
    .then(request => {
        if(!request) {
            return res.status(404).send({
                message: "Request Details not found with odcId " + req.params.odcId
            });            
        }
        res.send(request);
    }).catch(err => {
        if(err.kind === req.params.odcId) {
            return res.status(404).send({
                message: "Request Details not found with odcId " + req.params.odcId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Request Details with odcId " + req.params.odcId
        });
    });

};

// Update a Status identified by the ReqId in the request
exports.updateRequest = (req, res) => {
    // Validate Request
    if(!req.body.reqId) {
        return res.status(400).send({
            message: "Request ID can not be empty"
        });
    }

    Request.updateOne({reqId:req.params.reqId}, {
        reqId: req.body.reqId || 'Request Id Cannot be empty',
        employeeId: req.body.employeeId,
        odcId: req.body.odcId || "Empty OdcId", 
        projectId: req.body.projectId,
        justification: req.body.justification,
        status: req.body.status,
        requestedDates: req.body.requestedDates
    }, {new: true})
    .then(request => {
        if(!request) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.reqId
            });
        }
        res.send(request);
    }).catch(err => {
        if(err.kind === 'reqId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.reqId
            });                
        }
        return res.status(500).send({
            message: "Error updating Employee with id " + req.params.reqId
        });
    });
};

// Delete a Request with the specified reqId in the request
exports.deleteRequest = (req, res) => {
    Request.remove({reqId:req.params.reqId})
    .then(request => {
        if(!request) {
            return res.status(404).send({
                message: "Request not found with id " + req.params.reqId
            });
        }
        res.send({message: "Request deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'reqId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.reqId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Request with id " + req.params.reqId
        });
    });

};

// Find all Request Details with a status
exports.getRequestDetailsByStatus = (req, res) => {   
    Request.find({status: req.query.status})
    .then(request => {
        if(!req.query) {
            return res.status(404).send({
                message: "Request Details not found without status "
            });            
        }
        res.send(request);
    }).catch(err => {
        if(err.kind === req.query.status) {
            return res.status(404).send({
                message: "Request Details not found without status"
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Request Details with status "
        });
    });
};