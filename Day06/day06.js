/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

const express = require('express')
const app = express()

app.get("/greet", greetHandler);

const port=process.env.PORT||5500

app.listen(port, () => {
    console.log(`port is running in ${port}`);
});

function greetHandler(req, res) {
    const name = req.query.name;
    const greeting = name ? `Hello,  ${name}`:`Hello, guest!`;  // used ternary operator
    res.send(greeting);
}