const express = require('express');
const ExpressError = require('./expressError')
const operates = require('./operates.js')

const app = express();

app.use(express.json()); //.use is middlewear, on every reqeust; do this
app.use(express.urlencoded({ extended: true }));