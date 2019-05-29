const ODC = require('../models/odc.model.js');

//Create a new ODC Deatils
exports.createODCList = (req, res) => {
    // Validate request
    console.log(req.body);
        if(!req.body.odcId) {
            return res.status(400).send({
                message: "ODC ID can not be empty"
            });
        }
    
        // Create a ODC object
        const odc = new ODC({
            odcId: req.body.odcId,
            odcType: req.body.odcType,
            odcManagers: req.body.odcManagers
        });
    
        // Save ODC Details in the database
        odc.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the ODC Details."
            });
        });
    };

// Retrieve and return all ODC Details from the database.
exports.getODCList = (req, res) => {
    ODC.find()
    .then(odc => {
        res.send(odc);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving ODC List."
        });
    });
};

// Find a single ODC details with a odcId
exports.getODCDetailsById = (req, res) => {  
    ODC.find({odcId: req.params.odcId})
    .then(odc => {
        if(!odc) {
            return res.status(404).send({
                message: "ODC Details not found with id " + req.params.odcId
            });            
        }
        res.send(odc);
    }).catch(err => {
        if(err.kind === req.params.odcId) {
            return res.status(404).send({
                message: "ODC Details not found with id " + req.params.odcId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving ODC Details with id " + req.params.odcId
        });
    });
};


// Update a ODC Details identified by the odcId in the request
exports.updateODCDetailsById = (req, res) => {
    // Validate Request
    if(!req.body.odcId) {
        return res.status(400).send({
            message: "ODC ID can not be empty"
        });
    }

    ODC.updateOne({odcId:req.params.odcId}, {
        odcId: req.body.odcId,
        odcType: req.body.odcType,
        odcManagers: req.body.odcManagers
    }, {new: true})
    .then(odc => {
        if(!odc) {
            return res.status(404).send({
                message: "ODC Details not found with id " + req.params.odcId
            });
        }
        res.send(odc);
    }).catch(err => {
        if(err.kind === 'odcId') {
            return res.status(404).send({
                message: "ODC Details not found with id " + req.params.odcId
            });                
        }
        return res.status(500).send({
            message: "Error updating ODC Details with id " + req.params.odcId
        });
    });
};

// Delete a ODC Details with the specified odcId in the request
exports.deleteODCDetailsById = (req, res) => {
    ODC.remove({odcId:req.params.odcId})
    .then(odc => {
        if(!odc) {
            return res.status(404).send({
                message: "ODC Details not found with id " + req.params.odcId
            });
        }
        res.send({message: "ODC Details deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'odcId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "ODC Details not found with id " + req.params.odcId
            });                
        }
        return res.status(500).send({
            message: "Could not delete ODC Details with id " + req.params.odcId
        });
    });

};