const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const fileStore = require('session-file-store')(session);
const randomstring = require('randomstring');
const database = require('./model/database');

const fsp = require('fs').promises;

const router = require('./routes/api')

require('dotenv').config()

const hbs = exphbs.create();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/images'));

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

    // To maintain uniqueness among users; can be implemented for login feature too instead of session
    if (!req.session.id) {
       req.session.id = randomstring();
    }
    res.render('index', {layout: false});
});

// The keywords searched by user
app.get('/searched', async function(req, res) {
    if(!req.session.id == undefined) {
        res.redirect('/');
    }
    try {
        const userData = await database.findUser(req.session.id);
    } catch (err) {
        console.log(err.message);
    }
    res.render('searched', {keyword: userData.keyword, layout: false});
})

// Show all images that are present in a search
app.get('/images/:search', async (req, res) => {
    try {
        const data = await fsp.readdir(`./images/${req.params.search}/`);
        res.render('images', {layout: false, name: data, search: req.params.search});
    } catch (err) {
        res.status(404).send('not found');
    }

})

// used for api endpoints
app.use('/api', router);

app.listen(PORT, () => {
    console.log("server listeing on port", PORT);
})

module.exports = app;
