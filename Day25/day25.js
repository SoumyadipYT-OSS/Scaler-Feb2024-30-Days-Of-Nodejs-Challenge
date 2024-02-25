/**
 * Creates an index on the "name" field of the "Product" collection in MongoDB
 */
function createProductNameIndex() {
    // Get access to your Mongoose Product model
    const Product = require('./path/to/your/product.model'); // Replace with your model path
  
    // Create the index on the "name" field
    Product.collection.createIndex({ name: 1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created successfully:", result);
      }
    });
  }
  
  // Call the function to create the index
  createProductNameIndex();

  
  // Get all products
app.get('/products', (req, res) => {
    Product.find()
      .then((products) => res.send(products))
      .catch((err) => res.status(500).send(err));
  });
  

  app.listen(5400, () => console.log('Server is running on port 5400'));