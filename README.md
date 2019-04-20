# google-image-scrape

This repo should be able to run "as is". Just clone and run below commands in terminal. The website will be hosted at port 3000
or the whatever specified in enviroment variables.

Kindly run below commands for setup and running:

```
$ npm install
$ npm start
```

To change from online mlabs mongodb instance to local kindly change the connection url in `database.js`.

Hoisted at: [https://google-image-scrape.herokuapp.com/](https://google-image-scrape.herokuapp.com/)

Heroku apparently disables background running for free tier but this should work on local machine or a dedicated or 
paid server which allows background running.
