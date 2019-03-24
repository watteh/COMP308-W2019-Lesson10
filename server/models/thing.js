let mongoose = require('mongoose');

//create a model class
let thingSchema = mongoose.Schema({
    name: String,
    description: String
}, {
    collection: "favouritethings"
});

module.exports = mongoose.model('ryanwatson', thingSchema);