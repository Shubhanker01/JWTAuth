const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const port = 3000
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/signup', function (req, res) {
    try {
        let token = jwt.sign(req.body,"shhhh")
        res.send(token)
    } catch (error) {
        console.log(error)
    }
})
app.listen(port, () => {
    console.log(`App is listening on port:${port}`)
})