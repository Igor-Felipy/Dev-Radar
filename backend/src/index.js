const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes')
const config = require('../config')

const app = express();

mongoose.connect(config.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);