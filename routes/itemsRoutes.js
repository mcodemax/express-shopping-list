const { request } = require("express");
const express = require("express");
const ExpressError = require('../expressError');
const router = new express.Router();
const Item = require('../classes/item');
const items = require('../fakeDb')

router.get('', (req, res, next) => {    
    try {
        return res.send(items); //.json not needed b/c included in app.py
    } catch (error) {
        return next(error);
    }
});

router.post('', (req, res, next) => {    
	const name = req.body.name;
	const price = Number(req.body.price);

	try {
        if(!price) throw new ExpressError(`Need a valid price to add`, 400);
        
        if(name){ //maybe add validation to make sure there's not already an item with the same name in that list, turn this validation into a seperate f()? needs async??
            const item = new Item(name, price);
            return res.send({ added: item }); 
		}else{
			throw new ExpressError(`Need a valid name to add`, 400);
		}
    } catch (error) {
        return next(error);
    }

});



router.get('/:name', (req, res, next) => {    
	const name = req.params.name;
	const item = Item.findItem(name);
	
	try {
        if(!item){//if item=false
			throw new ExpressError(`Couldn't find item in list`, 404);
		}
    } catch (error) {
        return next(error);
    }
	
	return res.send(item);//{name: item.name, price: item.price} 
});

router.patch('/:name', (req, res, next) => {    
	const oldName = req.params.name;

    let newName = req.body.name ? req.body.name : oldName;
    let price = req.body.price ? req.body.price : null;
	
	if(!isNaN(req.body.price)) price = Number(price);

	try {
        if(Item.findItem(oldName)){//duplicate names allowed
			if(typeof price === 'string'){
				throw new ExpressError('Price must be a number.', 400);
			}
			const item = Item.alterItem(oldName, newName, price);
            return res.send({ updated: item }); 
		}else{
			throw new ExpressError(`Couldn't find item in list`, 404);
		}
    } catch (error) {
        return next(error);
    }
});

router.delete('/:name', (req, res, next) => {    
	const name = req.params.name;
	
	try {
		if(Item.findItem(name)){
			Item.deleteItem(name);
            return res.send({ message: "Deleted" }); 
		}else{
			throw new ExpressError(`Couldn't find item in list`, 400); 
		}
	} catch (error) {
		return next(error);
	}
});

module.exports = router;