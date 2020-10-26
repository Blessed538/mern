const { json } = require('body-parser');
const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../Models/ItemModel');

//@route GET api/items
// @desc Get all ITEMS
// @access public

router.get('/', (req, res, next) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

//@route POST api/items
// @desc Create a new post
// @access public

router.post('/', (req, res, next) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.json(item));
  
});

//@route Delete api/items/id
// @desc Delete requests
// @access public

router.delete('/:id', (req, res, next) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({success:true})))
    .catch((err) => res.status(404).json({ success: true }));
});

module.exports = router;
