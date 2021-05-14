// Inventory Route
const express = require('express');
const inventoryRouter = express.Router();
const Inventory = require('../models/inventory');

// Get Requests 
inventoryRouter.get('/', (req, res, next) => {
    Inventory.find((err, items) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        res.status(200).send(items);
    })
})

// Module Exports
module.exports = inventoryRouter;