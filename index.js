const scraper = require('images-scraper');
const google = new scraper.Google();

console.log(google);

google.list({
        keyword: 'banana',
        num: 10,
        detail: true,
        nightmare: {
            show: false
        }
    })
    .then(function (res) {
        console.log('first 10 results from google', res);
    }).catch(function (err) {
        console.log('err', err);
    });