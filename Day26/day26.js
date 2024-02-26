const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(express.json()); // for parsing application/json

const uri = "mongodb://localhost:27017/day26";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let productsCollection;

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("yourDatabaseName");
    productsCollection = database.collection("products");
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.error);

// Create a new product
app.post('/products', async (req, res) => {
  const product = req.body;
  try {
    const result = await productsCollection.insertOne(product);
    res.status(201).send(result.ops[0]);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Solution
app.get('/products/statistics', async (req, res) => {
        try {
            const pipeline = [
                { $group: {
                    _id: null,
                    totalProducts: { $sum: 1 },
                    averagePrice: { $avg: "$price" },
                    highestQuantity: { $max: "$quantity" }
                }}
            ];
        } catch (err) {
            res.status(500).send(err);
        }
});
app.listen(5400, () => console.log('Server is running on port 5400'));