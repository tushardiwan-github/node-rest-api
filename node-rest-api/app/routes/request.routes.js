module.exports = (app) => {
    const request = require('../controller/request.controller.js');

    // Create a new Request 
    app.post('/api/requestlist', request.createRequestList);

    //GET all Request 
    app.get('/api/requestlist', request.getRequestList);

    //GET Request list by ID
    app.get('/api/requestlist/request/:reqId', request.getRequestDetailsById);

    //GET Request list by odcId
    app.get('/api/requestlist/odc/:odcId', request.getRequestDetailsByOdcId);

    //GET Request list by Status
    app.get('/api/requestlist/request', request.getRequestDetailsByStatus);

    //Update Status using requestId
    app.put('/api/requestlist/request/:reqId', request.updateRequest);

    //Delete Request from DB
    app.delete('/api/requestlist/request/:reqId', request.deleteRequest);

}