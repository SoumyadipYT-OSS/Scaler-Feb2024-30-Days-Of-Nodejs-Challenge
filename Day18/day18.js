const mng = require('mongoose')
const express = require('express')
const app = express()

function getAllUsers(req, res) {
    userModel.find().then((users) => {
        console.log("User database is fetched...");
        res.json(users);
    }).catch((error) => {
        console.log("Error retrieving users:", error.message);
    });
}


const userSchema = new mng.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true }
});

const userModel = mng.model("User", userSchema)

mng.connect('mongodb://localhost:27018/day18').then(() => {
    console.log('Connected to MongoDB!');
}).catch((err) => {
    console.log('Error:', err);
});

app.get('/users', getAllUsers)

const PORT = 5400;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});