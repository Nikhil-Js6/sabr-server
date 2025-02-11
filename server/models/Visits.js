const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: "Unauthorized"
    },
    visitedAt: {
        type: Date,
        default: Date.now,
    },
    progress: {
        type: Number,
        default: 0,
    },
    ipAddress: { type: String },
    userAgent: { type: String },
    requestType: {
        type: String,
        enum: ["Authorized", "Unauthorized"]
    }
});

module.exports = new mongoose.model("Visit", visitSchema);