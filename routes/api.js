const express = require('express');
const app = express.Router();

const ImageController = require('../controller/imageController');

// Endpoint for getting the keyword -> scraping google -> saving images
app.get('/search', ImageController.search);

// Endpoint for sending back the file to user
app.get('/images/:folder/name/:name', ImageController.sendFile)

module.exports = app;
