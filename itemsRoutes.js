const express = require("express");
const router = new express.Router();
const items = require('./fakeDb')

router.get('/', (req, res, next) => {    
    return res.send(items); //.json not needed b/c included in app.py
});

router.get('/:name', (req, res, next) => {    
    
    return res.send(items); //.json not needed b/c included in app.py
});


module.exports = router;