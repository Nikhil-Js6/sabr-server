const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');
const { mongoose } = require('mongoose');
require('dotenv').config();


const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

// Database
mongoose.connect(process.env.CLOUD_DB_URL || process.env.LOCAL_DB_URL);

mongoose.connection.on('connected', () => {
    console.log("Database connected \u{1F525}");
});

// Auto Routes
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

let port = process.env.PORT || 3300;

app.listen(port, console.log(`Server started on port: ${port} \u{1F525}\u{1F680}`));