const express = require('express')
const router = express.Router()
const posts = require('../schemapost.js')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

// to create a new post
router.post('/post', async (req, res) => {
    try {
        jwt.verify(req.body.token, process.env.SECRET, function (err, id) {
            if (err) {
                res.status(403).send("Authorization denied")
            }
            else {
                posts.create({
                    "user_id": id,
                    "caption": req.body.caption,
                    "description": req.body.description,
                    "likes": 0
                })
                res.send("post added successfully")
            }

        })
    }
    catch (err) {
        console.log(err)
    }

})

// to get all the posts by the user
router.get('/getposts', authenticateToken, async (req, res) => {
    try {
        let data = await posts.find({ user_id: req.user })
        res.send(data)

    }
    catch (err) {
        console.log(err)
    }
})

// delete post
router.delete('/delete/:id', async (req, res) => {
    try {
        await posts.findByIdAndDelete(req.params.id)
        res.send("Your post is successfully deleted")
    }
    catch (err) {
        console.log(err)
    }
})


// updating post
router.post('/update/:id', async (req, res) => {
    try {
        await posts.findByIdAndUpdate(req.params.id, { caption: req.body.caption, description: req.body.description })
        res.send("Your post is updated successfully")
    } catch (error) {
        console.log(error)
    }
})

// updating likes of the post
router.post('/likes/:id', async (req, res) => {
    try {
        let data = await posts.findById(req.params.id)
        data.likes = data.likes + 1
        await data.save()
        res.send("You liked this post")
    } catch (error) {
        console.log(error)
    }
})

// unliking the post
router.post('/unlike/:id', async (req, res) => {
    try {
        let data = await posts.findById(req.params.id)
        data.likes = data.likes - 1
        await data.save()
        res.send("Post unliked")
    } catch (error) {
        console.log(error)
    }
})


// adding the comments to the post
router.post('/comments/:id', async (req, res) => {
    try {
        let data = await posts.findById(req.params.id)
        let commentid = new mongoose.mongo.ObjectId()
        data.comments.push({ id: commentid, comment: req.body.comment })
        await data.save()
        res.send("You added a comment")
    } catch (error) {
        console.log(error)
    }
})


// getting comments
router.get('/showcomments/:id', async (req, res) => {
    try {
        let data = await posts.findById(req.params.id)
        res.send(data.comments)
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
            return res.status(403).send("Invalid Authorization!!!")
        }
        req.user = user
    })
    next()
}

module.exports = router