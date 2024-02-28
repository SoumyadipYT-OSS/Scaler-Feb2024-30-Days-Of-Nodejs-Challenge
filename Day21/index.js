const express = require('express')
const request = require('request')

const app = express()

app.length('/', (req, res) => {
    const request = require('request');
    request('http://www.google.com', function (error, response, body) {
        if (response.statusCode === 200) {
            res.send(`The weather in your city "${city}"`)
        }
        console.log('error:', error);
        console.log('statusCode: ', response && response.statusCode);
        console.log('body: ', body);
    })
});

const PORT = process.env.PORT || 5400;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));