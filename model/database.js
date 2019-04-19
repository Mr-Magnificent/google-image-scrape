const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@ds225442.mlab.com:25442/images`, {
    useNewUrlParser: true
}, function (err) {
    if (err) {
        throw err;
    }
    console.log("mlabs connected!");
});

const Keyword = mongoose.model('Keyword', {
    value: String,
    users: [{
        name: String
    }]
});

module.exports = Keyword;