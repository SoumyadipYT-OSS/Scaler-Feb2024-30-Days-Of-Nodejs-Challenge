/**
 * Express middleware to log incoming requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */

const express = require('express')
const app = express()

app.get("/msg", requestLoggerMiddleware);

const port=process.env.PORT||5500

app.listen(port, () => {
    console.log(`port is running in ${port}`);
});

function requestLoggerMiddleware(req, res, next) {

    const timestamp = new Date().toISOString();

    const method = req.method;

    console.log(`${timestamp} - ${method} request recieved.`);
    res.send(timestamp)
    res.send(method)

    next();
}