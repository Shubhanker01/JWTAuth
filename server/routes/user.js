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
        jwt.sign(req.user.id, process.env.SECRET, function (err, token) {
            res.send({ user: req.user, refreshToken: token })
        })

    }
    catch (err) {
        console.log(err)
    }
})

// use refreshtoken to get user info
router.get('/userprofile', async (req, res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        let response = jwt.verify(token, process.env.SECRET, function (err, user) {
            if (err) {
                return "Invalid Authorization"
            }
            else {

                return user

            }
        })
        if (response == "Invalid Authorization") {
            res.status(403).send(response)
        }
        else {
            let data = await user.findById(response)
            res.send(data)
        }
    } catch (error) {
        console.log(error)
    }
})


// login
router.post('/login', async function (req, res) {
    try {
        let userData = await user.findOne({ email: req.body.email })
        let comp = bcrypt.compareSync(req.body.password, userData.password)
        if (comp == true) {
            let data = {
                id: userData._id,
                username: userData.username,
                email: userData.email
            }
            jwt.sign(data, process.env.SECRET, { expiresIn: 30 }, function (err, token) {
                res.send({ message: "Success", accessToken: token })
            })
        }
        else {
            res.status(403).send("Invalid Password or Email is wrong")
        }
    }
    catch (err) {
        console.log(err)
    }
})

// forgot password
router.post('/forgotpassword',async(req,res)=>{
    try {
        let data = await user.findOne({email:req.body.email})
        if(data==null){
            res.status(403).send("Invalid User could not find email")
        }
        else{
            const hash = bcrypt.hashSync(req.body.password,saltRounds)
            data.password = hash
            await data.save()
            res.send("Your password is reset successfully Go to login")
        }
    } catch (error) {
        console.log(error)
    }
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET, function (err, user) {
        if (err) {
            return res.status(403).send("Token is expired Login again!!!")
        }
        req.user = user
    })
    next()
}
module.exports = router