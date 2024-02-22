const mongoose = require('mongoose');
const express = require('express');

// Product Schema
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },             
});

// Product Model
const Product = mongoose.model('Product', ProductSchema);
// Connect to MongoDB dataBase
mongoose.connect('mongodb://localhost:27017/day22', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const app = express();

// Creates a new product in MongoDB
async function createProduct(product) {
    const newProduct = new Product(product);
    return await newProduct.save();
}

// Retrieves all products from MongoDB
async function getAllProducts() {
    return await Product.find({});
}

// Update products in MongoDB
async function updateProduct(productId, updatedProduct) {
    return await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
}

// Delete product from MongoDB
async function deleteProduct(productId) {
    return await Product.findByIdAndDelete(productId);
}


// app.get('/products', async (req, res) => {
//     try {
//         const products = await getAllProducts();
//         res.json(products);
//     } catch (error) {
//         res.status(500).send('Server Error');
//     }
// });
app.get('/products', getAllProducts);


const PORT = process.env.PORT || 5400;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Create a product
createProduct({ name: 'Ashok Leyland share price', price: 173, quantity: 50 })
    .then(product => console.log(product))
    .catch(err => console.log(err));

createProduct({ name: 'HCL Technologies LTD. Bharat share price', price: 1600, quantity: 130 })
    .then(product => console.log(product))
    .catch(err => console.log(err));

createProduct({ name: 'JSW Group Ltd. Bharat share price', price: 800, quantity: 40 })
    .then(product => console.log(product))
    .catch(err => console.log(err));

createProduct({ name: 'Tata Motors Bharat share price', price: 932, quantity: 180 })
    .then(product => console.log(product))
    .catch(err => console.log(err));

createProduct({ name: 'Bajaj Auto Bharat share price', price: 8645, quantity: 20 })
    .then(product => console.log(product))
    .catch(err => console.log(err));

createProduct({ name: 'Tata Elxsi Ltd. Bharat share price', price: 8998.99, quantity: 130 })
    .then(product => console.log(product))
    .catch(err => console.log(err));

createProduct({ name: 'Shree Cement Ltd. Bharat', price: 26565, quantity: 130 })
    .then(product => console.log(product))
    .catch(err => console.log(err));

createProduct({ name: 'Gupta Power Infrastructure Ltd. Bharat', price: 26565, quantity: 130 })
    .then(product => console.log(product))
    .catch(err => console.log(err));

// Get all products
getAllProducts()
    .then(products => console.log(products))
    .catch(err => console.log(err));

// Update a product
updateProduct('Ashok Leyland stock price', { name: "Ashok Leyland stock price", price: 200, quantity: 20 })
  .then(product => console.log(product))
  .catch(err => console.log(err));

// Delete a product
// deleteProduct('productId')
//   .then(() => console.log('Product deleted'))
//   .catch(err => console.log(err)); 