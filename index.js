const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const fileStore = require('session-file-store')(session);
const randomstring = require('randomstring');
const database = require('./model/database');

const router = require('./routes/api')

require('dotenv').config()

const hbs = exphbs.create();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyparser.urlencoded({extended: true}));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');


app.use(session({
    store: new fileStore, 
    secret: process.env.SESSIONSECRET, 
    resave: true,
    saveUninitialized: true
}));

app.get('/', function (req, res) {
    if (!req.session.id) {
       req.session.id = randomstring();
    }
    res.render('index', {layout: false});
});

app.get('/searched', async function(req, res) {
    if(!req.session.id == undefined) {
        res.redirect('/');
    }
    const userData = await database.findUser(req.session.id);
    console.log(userData);
    res.render('searched', {value: userData.value, keyword: userData.keyword, layout: false});
})

app.use('/api', router);

app.listen(PORT, () => {
    console.log("server listeing on port", PORT);
})

module.exports = app;
