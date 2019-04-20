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

const User = mongoose.model('User', {
    user: String,
    keyword: [{
        name: String
    }]
});

exports.findUser = async (id) => {
    const data = await User.findOne({user: id});
    console.log("data", data);
    return data;
}

exports.UserExists = async (id, query) => {
    const data = await User.findOne({user: id});
    data.keyword.push({name: query});
    data.save();
}

exports.addUser = async (id, query) => {
    const data = new User;
    data.user = id;
    data.keyword.push({name: query});
    data.save();
}

exports.User = User;