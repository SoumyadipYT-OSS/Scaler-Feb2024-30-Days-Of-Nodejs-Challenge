const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json()); // for parsing application/json

// Define schema for Product
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

// Create model from the schema
const Product = mongoose.model('Product', productSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:271019/day24', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a new product
app.post('/products', (req, res) => {
  const product = new Product(req.body);
  product.save()
    .then(() => res.status(201).send(product))
    .catch((err) => res.status(400).send(err));
});

// Get all products
app.get('/products', (req, res) => {
  Product.find()
    .then((products) => res.send(products))
    .catch((err) => res.status(500).send(err));
});

// Update a product
app.put('/products/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((product) => res.send(product))
    .catch((err) => res.status(400).send(err));
});

// Delete a product
app.delete('/products/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).send())
    .catch((err) => res.status(400).send(err));
});

app.listen(5400, () => console.log('Server is running on port 5400'));