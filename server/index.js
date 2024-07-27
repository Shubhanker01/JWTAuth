const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const port = 3000
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
const user = require('../server/routes/user')
const posts = require('../server/routes/post')

app.use('/', user)
app.use('/',posts)
app.get('/',function(req,res){
    res.send("hello world")
})
async function main() {
    await mongoose.connect(process.env.URI)
}
main().then(() => console.log("successfully connected")).catch(err => console.log(err))
app.listen(port, () => {
    console.log(`App is listening on port:${port}`)
})