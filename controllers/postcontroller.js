let express = require('express')
let router = express.Router()
let sequelize = require('../db');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let Post = sequelize.import('../models/post');
let validateSession = require('../middleware/validate-session')

router.post('/create',validateSession, (req, res) => {
    console.log(req.body);
    Post.create({
       
            owner:req.body.post.owner,
            title: req.body.post.title, // add req.body.post.type when merging with client
            platform: req.body.post.platform, // add platform: req.body.platform.type, when merging with client
            playlist: req.body.post.playlist, // add pplaylist: req.body.playlist.type, when merging with client
            mic: req.body.post.mic, // add mic: req.body.mic.type, when merging with client
            players: req.body.post.players, // add players: req.body.players.type, when merging with client
            rank: req.body.post.rank, // add rank: req.body.rank.type, when merging with client
            text: req.body.post.text // add text: req.body.text.type, when merging with client
        
        })
    .then(
        function createPostSuccess (post) {
            let token = jwt.sign({ id: post.id }, 'JWT_SECRET',{expiresIn: 60*60*24});
                res.status(200).json ({
                Post: post,
                message: 'New Post Created!',
                sessionToken: token
            })
        },
        function createPostFail(err) {
            res.status(500).send(err.message)       
        }
    )
})



router.get('/all', (req, res) => {
    Post.findAll()
    .then(
        function findAllSuccess(post) {
            res.status(200).json({
                post
            })
        },

        function findAllError(err) {
            res.status(500).send("Could not All the Post's!")
        }
    )
})
router.get('/:id', (req, res) => {
    Post.findOne({ where: {id: req.params.id } })
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json(err))
})


router.put('/update/:id',validateSession,(req, res) => {
    Post.update({
        owner:req.body.post.owner,
        title: req.body.post.title, // add req.body.title.type when merging with client
        platform: req.body.post.platform, // add platform: req.body.platform.type, when merging with client
        playlist: req.body.post.playlist, // add pplaylist: req.body.playlist.type, when merging with client
        mic: req.body.post.mic, // add mic: req.body.mic.type, when merging with client
        players: req.body.post.players, // add players: req.body.players.type, when merging with client
        rank: req.body.post.rank, // add rank: req.body.rank.type, when merging with client
        text: req.body.post.text // add text: req.body.text.type, when merging with client
    },
    {
        where: {
            id: req.params.id,
            // username: req.params.username
        }
    })
    .then(
        function updateSuccess(post) {
            res.status(200).json({
                Post: post,
                message: "Post successfully updated!"
            })
        },

        function updateFail(err) {
            res.status(500).json({
                message: err.message
            })
        }
    )
})

router.delete('/delete/:id',validateSession, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
            // username: req.params.username
        }
    })
    .then(
        function deleteSuccess(post) {
            res.status(200).json({
                Post: post,
                message: "Successfully deleted"
            })
        },

        function deleteFail(err) {
            res.status(500).json({
                error: err.message
            })
        }
    )
})
module.exports = router;