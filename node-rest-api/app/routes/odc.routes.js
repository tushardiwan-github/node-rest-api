module.exports = (app) => {
    const odc = require('../controller/odc.controller.js');

    // Create a new ODC 
    app.post('/api/odclist', odc.createODCList);

    //GET all ODC List
    app.get('/api/odclist', odc.getODCList);

    //GET ODC list by ID
    app.get('/api/odclist/:odcId', odc.getODCDetailsById);

    //Update ODC list using odcId
    app.put('/api/odclist/:odcId', odc.updateODCDetailsById);
       
    //Delete ODC list using odcId
    app.delete('/api/odclist/:odcId', odc.deleteODCDetailsById);
       
}