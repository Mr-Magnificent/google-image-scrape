const Scraper = require('images-scraper'),
    google = new Scraper.Google();
const request = require('request');

exports.search = async (req, res) => {
    try {
        const imageRes = await google.list({
            keyword: req.query.search,
            num: 10,
            detail: true,
            nightmare: {
                show: false
            }
        })
        for (let image of imageRes) {
            console.log(image.url);
        }
        res.status(200).send('Images saved');
    } catch (err) {
        console.log('err', err);
        res.status(400).send(err.message);
    }
    
};