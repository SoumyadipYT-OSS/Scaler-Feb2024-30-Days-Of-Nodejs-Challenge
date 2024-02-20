const express = require('express');
const mongoose = require('mongoose');

// Define User schema and create User model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});
const User = mongoose.model('User', UserSchema);

mongoose.connect('mongodb://localhost:27017/day20', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));



const app = express();
app.get('/avg-age', averageAgeOfUsers);
const PORT = process.env.PORT || 5400;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


async function averageAgeOfUsers(req, res) {
    try {
        const result = await User.aggregate([
            {
                $group: {
                    _id: null,
                    averageAge: { $avg: "$age" }
                },
            },
        ]);
        if (result.length === 0) {
            return res.status(404).send('No users found');
        }

        const averageAge = result[0].averageAge;
        res.json({ averageAge });
    } catch (error) {
        res.status(500).send('Server Error');
    }
}