const { rateLimit } = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 5 * 60 * 100,
    limit: 2,
    message: 'You have exhausted the number of limit requests. Please try again later',
    statusCode: 429
});

module.exports = limiter;