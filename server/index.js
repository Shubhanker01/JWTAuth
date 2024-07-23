const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3000
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.post('/signup', (req, res) => {
    res.send("successfully submitted")
})

app.listen(port, () => {
    console.log(`App is listening on port:${port}`)
})