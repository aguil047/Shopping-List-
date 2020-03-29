const express =require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

//@route GET api/items
//@desc get all items
//@access public 
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(item => res.json(item));
});

//@route POST api/items
//@desc Create a Item
//@access public 
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

//@route DELETE api/items/:id
//@desc Delete a item
//@access public 
router.delete('/:id', (req, res) => {
    Item.findById(req.param.id).then(item => 
        item.remove().then(() => res.json({ success: true})))
        .catch(err => res.status(404).json({ success: false}));
    });



module.exports  =  router;
