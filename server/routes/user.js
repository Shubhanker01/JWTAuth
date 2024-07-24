const express = require('express')
const router = express.Router()
const user = require('../schema')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

// signup
router.post('/signup', async function (req, res) {
    try {
        const hash = bcrypt.hashSync(req.body.password, saltRounds)
        await user.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        res.send("Your record is successfully sent")
    }
    catch (err) {
        console.log(err)
    }
})

// login
router.post('/login', async function (req, res) {
    try {
        let userData = await user.findOne({ email: req.body.email })
        let comp = bcrypt.compareSync(req.body.password, userData.password)
        if (comp == true) {
            console.log(userData)
            jwt.sign(userData, process.env.SECRET, function (err, token) {
                res.send(token)
            })
        }
        else {
            res.send("Invalid User")
        }
    }
    catch (err) {
        console.log(err)
    }
})
module.exports = router