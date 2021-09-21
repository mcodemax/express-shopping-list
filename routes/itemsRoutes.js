const express = require("express");
const router = new express.Router();
const Item = require('../classes/item');
const items = require('../fakeDb')

//might need2coerce stuff inte integers somewhere
router.get('', (req, res, next) => {    
    try {
        console.log(Item)
        return res.send(items); //.json not needed b/c included in app.py
    } catch (error) {
        return next(error);
    }
});

router.post('', (req, res, next) => {    
    console.log(req.body);
    return res.send({added}); 
});


module.exports = router;