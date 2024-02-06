const express = require('express');
const app = express();

/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

function greetHandler(req, res) {
    const name = req.query.name;

    if (name) {
        res.send(`Hello, ${name}!`);
    } else {
        res.send('Hello, Guest!');
    }
}


app.get('/greet', greetHandler);
const port = 5500;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
