const express = require('express')

const app = express()
const PORT = 5400;
app.use(express.json())

/**
 * Logging middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
*/



function loggingMiddleware(req, res, next) {
    const timeStamp = new Date().toISOString();
    const { method, url, headers, body } = req;
    const logMessage = `Method: ${method} URL: ${url} Headers: ${JSON.stringify(headers)} Body: ${JSON.stringify(body)} Timestamp: ${timeStamp}`;
    console.log(logMessage);
    return next();
}


app.all('*', loggingMiddleware, (req, res) => {
    res.send('Day 15 Challenge of NodeJS');
});


app.listen(PORT, error => {
    if (!error) {
        console.log(`Server is running on port: ${PORT}`);
    } else {
        console.log(`Server is not running due to: ${error}`);
    }
});