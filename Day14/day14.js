const express = require('express');
const redis = require('redis');
const app = express();

// Create a new redis client and connect to a local Redis instance.
const client = redis.createClient();

// If an error occurs, print it to the console.
client.on('error', (err) => {
  console.error('Redis error', err);
});

function cachingMiddleware(req, res, next) {
  const url = req.originalUrl;

  // Try fetching the result from Redis first in case we have it cached
  client.get(url, (err, result) => {
    // If that key exist in Redis store
    if (result) {
      res.send(result);
    } else {
      // Else, continue to the next middleware function
      res.sendResponse = res.send;
      res.send = (body) => {
        client.set(url, body); // Save the response in Redis cache
        res.sendResponse(body);
      };
      next();
    }
  });
}

app.use('/', cachingMiddleware);


app.listen(5500, () => {
  console.log('Server running on port 5500');
});