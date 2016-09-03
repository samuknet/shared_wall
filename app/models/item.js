var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Item Schema
var ItemSchema = new Schema ({
    type: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false
    }
});

var Item = mongoose.model('Item', ItemSchema);

module.exports = Item;