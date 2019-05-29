const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    employeeId: {type: Number,required: true},
    password: {type: String,required: true},
    name: {type: String,required: true},
    email: {type: String,required: true},
    phone: {type: Number,required: true},
    role: {type: String,required: true},
    managerId: {type: Number,required: true},
    orgName: {type: String,required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);