const express = require('express');
const mongoose = require('mongoose');

// Define User schema and create User model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true,
        validate: {
            validator: function(v) {
                // Use simple regex to validate email
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
    }
});
const User = mongoose.model('UserValidation', UserSchema);

mongoose.connect('mongodb://localhost:27017/day19', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const app = express();
app.get('/day19Challenge', addUserWithValidation);


function addUserWithValidation(user) {
    const newUser = new User(user);

    newUser.save((error) => {
        if (error) {
            console.log("Error creating user: ", error.message);
        } else {
            console.log("User added successfully");
        }
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
    username: "John Doe",
    email: "ivalid-email",
});