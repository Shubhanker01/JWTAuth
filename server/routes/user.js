const express = require('express')
const router = express.Router()
const user = require('../schema')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

// signup
router.post('/signup', async function (req, res) {
    try {
        // check if the email is already taken
        const data = await user.findOne({ email: req.body.email })
        if (data != null) {
            res.status(403).send("Email is already taken")
        }
        else {
            const hash = bcrypt.hashSync(req.body.password, saltRounds)
            await user.create({
                username: req.body.username,
                email: req.body.email,
                password: hash
            })
            res.send("Your record is successfully sent")
        }

    }
    catch (err) {
        console.log(err)
    }
})

router.get('/getuserinfo', authenticateToken, function (req, res) {
    try {
        res.send(req.user)
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
            let data = {
                username: userData.username,
                email: userData.email
            }
            jwt.sign(data, process.env.SECRET, { expiresIn: 60 }, function (err, token) {
                res.send({ message: "Success", accessToken: token })
            })
        }
        else {
            res.status(403).send({message:"Invalid User or password is wrong"})
        }
    }
    catch (err) {
        console.log(err)
    }
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET, function (err, user) {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user
    })
    next()
}
module.exports = router