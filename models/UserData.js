const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    Users: {
        type: [String],
        default: [],
    },
    Visits: {
        type: Number,
        default: 0,
    },
    UnauthorizedRequests: {
        type: Number,
        default: 0,
    },
},
    { timestamps: true }
);

module.exports = new mongoose.model("UserData", dataSchema);
