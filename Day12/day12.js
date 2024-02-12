const express = require('express')
const rateLimiter = require('./rateLimiterMiddleware.js')

const app = express()
const PORT = 5500

app.get('/', rateLimiter, (req, res) => {
    res.send('You have accessed the route within the limit request');
});


app.listen(PORT, error => {
    if (!error) {
        console.log(`The server is running successfully and running on ${PORT}`)
    } else {
        console.log(error.message);
    }
});