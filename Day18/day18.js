const express = require('express');
const mongoose = require('mongoose');

// Define User schema and create User model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});
const User = mongoose.model('User', UserSchema);

mongoose.connect('mongodb://localhost:27017/day18', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const app = express();
app.get('/users', getAllUsers);

function getAllUsers(req, res) {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      console.error(`Error retrieving users: ${error.message}`);
      res.status(500).send(`Error retrieving users: ${error.message}`);
    });
}

const PORT = process.env.PORT || 5400;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// Add a new user
async function addUser(user) {
    const newUser = new User({
        username: user.username,
        email: user.email
    });

    try {
        const res = await newUser.save();
        console.log("New user is created");
    } catch (error) {
        console.log("Error creating user: ", error.message);
    }
}
addUser({
    username: "Dishant Yadav",
    email: "dishant-test@gmail.com",
});