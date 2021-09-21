const express = require('express');
const ExpressError = require('./expressError');
const morgan = require('morgan');

const itemsRoutes = require('./itemsRoutes');
// add fakeDb.js?

const app = express();

app.use(express.json()); //.use is middlewear, on every reqeust; do this
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/items', itemsRoutes);



app.use((err, req, res, next) => { //having 4 args tels express it's an err handler
    //default status is 500 internal server err
    let status = err.status || 500;
    let msg = err.msg;

    //set status and alert user
    return res.status(status).json({
        error: { msg, status }
    })
});

app.listen(3000, () => { //always have this at END of file, b/c need definied routes b4 you start listening
    console.log('Server running on port 3000')
});