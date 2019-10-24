const express = require('express')
const cors = require('cors')
const microbreweries = require('./microbreweries.json')

const app = express()
app.use(cors())

app.get('/microbreweries', (req, res) => {
    res.send(microbreweries)
});

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening on :${port}`))