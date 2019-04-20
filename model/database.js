const mongoose = require('mongoose');
require('dotenv').config();

// Used mlabs for mongodb
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
    keyword: []
});

// id- sessionid used to differentiate users (can be changed to login token jwt)
exports.findUser = async (id) => {
    const data = await User.findOne({user: id});
    console.log("data", data);
    return data;
}

// query is the keyword searched by the user on home page
exports.UserExists = async (id, query) => {
    const data = await User.findOne({user: id});

    if (!(data.keyword.includes(query))) {
        data.keyword.push(query);
    }
    data.save();
}

exports.addUser = async (id, query) => {
    const data = new User;
    data.user = id;
    data.keyword.push(query);
    data.save();
}

exports.User = User;