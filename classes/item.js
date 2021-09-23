const items = require('../fakeDb'); //a global arr of items
//const items = []; //for use in snippet tsting
//new Item('popsicle', 1.50)
//new Item('milk', 3.50)

class Item {
    constructor(name, price){
        this.name = name;
        this.price = price;

        //push item into items arr
        items.push(this);
    }

    /**
     * finds item with given name, if name not found returns false
     */
    static findItem(name){//if there's 2 items of same name will jsut return the first
        const found = items.filter(item => item.name === name);

        if(!found.length) return false;//if arr size is 0, didn't find it

        return found[0];
    }

    /**finds item in arr and alters the name and or price 
     * returns false if not found
    */
    static alterItem(oldName, newName, price = null){
        const item = this.findItem(oldName);

        if(item){//if item exists update items arr and return item
            item.name = newName;
            if(price) item.price = price;
            return item;
        }else{
            return false;
        }
    }

    /**deletes item from array, if not found returns false 
     * it will del 1st matching item from array if there's duplicates
     * returns false if nothing found to delete
    */
    static deleteItem(name){
        const index = items.findIndex(item => item.name === name);
        if(index === -1) return false;
        items.splice(index, 1);
    }
}

module.exports = Item;