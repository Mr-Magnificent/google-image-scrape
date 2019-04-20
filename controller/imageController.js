const Scraper = require('images-scraper'),
    google = new Scraper.Google();

const axios = require('axios');
const jimp = require('jimp');
const compressImages = require('compress-images');

const fs = require('fs');
const fsp = fs.promises;

const database = require('../model/database');

const downloadImage = (url, imagePath) => jimp.read(url)
    .then(image => {
        return image
        .greyscale()
        .quality(60);
    }).then(image => {
        image.writeAsync(imagePath);
        return true;
    })
    .catch(error => (false));

exports.search = async (req, res) => {
    const checkUserExists = await database.findUser(req.session.id);
    
    try {
        await fsp.access(`./images/${req.query.search}/`);
        if (!checkUserExists) {
            database.addUser(req.session.id, req.query.search);
        } else {
            database.UserExists(req.session.id, req.query.search);
        }
        res.status(200).send("Images saved");
        return;
    } catch (err) {
    }

    try {
        const imageRes = await google.list({
            keyword: req.query.search,
            num: 15,
            detail: true,
            nightmare: {
                show: false
            }
        })

        let imageReqest = [];
        try {
            await fsp.mkdir('./images/' + req.query.search);
        } catch (err) {
            console.log(err.message);
        }
        for (let image of imageRes) {
            console.log(image);

            const filename = `./images/${req.query.search}/` + RegExp(/[^\/]+$/).exec(image.url)[0];
            console.log(filename);
            imageReqest.push(downloadImage(image.url, filename));
        }
        console.log(imageReqest);
        const resp = await Promise.all(imageReqest);
        console.log(resp);
        res.status(200).send('Images saved');
    } catch (err) {
        console.log('err', err);
        res.status(400).send(err.message);
    }
};