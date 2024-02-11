/**
 * Authentication middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
*/

require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

let refreshTokens = []

app.post('/token', (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) {
        return res.sendStatus(401);
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const accessToken = authenticationMiddleware({ name: user.name })
        res.json({ accessToken: accessToken })
    });
});

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204);
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const user = { name: username };

    const accessToken = authenticationMiddleware(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
});


function authenticationMiddleware(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}
app.get('/protected', authenticationMiddleware)
const port = 5400;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})