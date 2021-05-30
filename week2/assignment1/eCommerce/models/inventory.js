// Schema Set Up
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Inventory Schema
const inventorySchema = new Schema({
    itemName: {
        type: String,
        require: true
    },
    itemType: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    available: {
        type: Boolean,
        require: true
    }
});

// Schema Module Exports
module.exports = mongoose.model('Inventory', inventorySchema);