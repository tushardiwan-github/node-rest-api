const mongoose = require('mongoose');

const ODCSchema = mongoose.Schema({
    odcId: Number,
    odcType:{type: String, required: false },
    odcManagers:{type: Array, required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('odc', ODCSchema);