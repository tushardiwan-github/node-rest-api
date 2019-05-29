const mongoose = require('mongoose');

const RequestSchema = mongoose.Schema({
    reqId: {type: Number,required: true},
    employeeId: {type: Number,required: true},
    odcId: {type: Number,required: true},
    projectId: {type: Number,required: true},
    justification: {type: String,required: true},
    status: {type: String,required: true},
    requestedDates: {type: Array,required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('Request', RequestSchema);