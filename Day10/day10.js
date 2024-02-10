const express = require('express')
const path = require('path')
const app = express()

app.use(express.static('public'))

function staticFileServer(req, res) {
    res.sendFile(path.resolve('./public/index.html'));
}


app.get('/', staticFileServer)

const port = 5400;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})