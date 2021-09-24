const express = require('express');
const ExpressError = require('./expressError');
const morgan = require('morgan');

const itemsRoutes = require('./routes/itemsRoutes');

const app = express();

app.use(express.json()); //.use is middlewear, on every reqeust; do this
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

/**Routes related to items */
app.use('/items', itemsRoutes);

/**404 err handler */
app.use((req, res, next) => {
    throw new ExpressError('Page not found', 404) //throw don't return it; ask why it matters.
});

/**General Err Handler */
app.use((err, req, res, next) => { //having 4 args tels express it's an err handler
    //default status is 500 internal server err
    let status = err.status || 500;
    let msg = err.msg;

    //set status and alert user
    return res.status(status).json({
        error: { msg, status }
    })
});

module.exports = app;