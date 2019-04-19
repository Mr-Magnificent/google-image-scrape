const express = require('express');
const app = express.Router();

const ImageController = require('../controller/imageController');

app.get('/search', ImageController.search);

module.exports = app;
