const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    progress: {
        type: Number,
        default: 0,
    }
});

module.exports = new mongoose.model("Progress", progressSchema);