const express = require('express');
// const errorHandler = require('errorhandler');

const app = express();

// Middleware to log incoming requests (optional)
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// Route for a protected resource
app.get('/protected', errorHandler, (req, res, next) => {
  // Simulate an authorization check
  if (!req.headers.authorization) {
    return next(new Error('Unauthorized')); // Throw an error if not authorized
  }
  // ... perform protected resource logic here
  res.send('This is a protected resource.');
});

// Route for a public resource
app.get('/public', (req, res) => {
  res.send('This is a public resource.');
});

// Route that throws a validation error
app.post('/validate', (req, res, next) => {
  if (!req.body.name) {
    return next(new ValidationError('Name is required')); // Throw a validation error
  }
  res.send(`Hello, ${req.body.name}`);
});

// Register the errorHandler middleware
app.use(errorHandler);

// Start the server
const port = 5400;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});





function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error for debugging
  
    // Set the appropriate status code based on the error type
    let statusCode = 500; // Internal Server Error by default
  
    if (err.name === 'ValidationError') {
      statusCode = 400; // Bad Request for validation errors
    } else if (err.status) {
      statusCode = err.status; // Use the status code provided by the error
    }
  
    // Create an error response object
    const errorResponse = {
      message: err.message || 'Internal Server Error', // Use the error message or a default message
    };
  
    // Send the error response to the client
    res.status(statusCode).json(errorResponse);
  }

  
  app.use(errorHandler);