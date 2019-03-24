let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the db schema
let thing = require('../models/thing');

/* GET Contact List page - READ Operation */
router.get('/', (req, res, next) => {
    thing.find((err, thingList) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('thing/index', {
                title: 'Favourite Things List',
                thingList: thingList
            })
        }
    });
});

module.exports = router;