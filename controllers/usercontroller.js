let express = require('express')
let router = express.Router()
let sequelize = require('../db');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let User = sequelize.import('../models/user');
let validateSession = require('../middleware/validate-session')

router.post('/signup', (req, res) => {
    User.create({
            username: req.body.username, // add req.body.user.username when merging with client
            password: bcrypt.hashSync(req.body.password,10), // add req.body.user.password when merging with client
    })
    .then(
        function signupSuccess (user) {
            let token = jwt.sign({ id: user.id }, 'JWT_SECRET',{expiresIn: 60*60*24});
                res.status(200).json ({
                user: user,
                message: 'New Player Created!',
                sessionToken: token
            })
        },
        function signupFail(err) {
            res.status(500).send(err.message)       
        }
    )
})
router.post('/signin',validateSession, (req, res) => {
    User.findOne({ where: { username: req.body.username } }).then (user => { //add req.body.user.username when merging with client
        if (user) {
            bcrypt.compare(req.body.password, user.passwordHash, (err, matches) => { //add req.body.user.password when merging with client
                if(user) {
                    let token = jwt.sign({ id: user.id }, 'JWT_SECRET', { expiresIn: 60*60*24 });
                    res.json({
                        user: user,
                        message: 'Successfully authenticated.',
                        sessionToken: token
                    });
                } else {
                    res.status(502).send({ error: 'Passwords do not match.' })
                }
            });
        } else {
            res.status(403).send({ error: 'User not found.' })
        }
    })
})

router.get('/all', (req, res) => {
    User.findAll()
    .then(
        function findAllSuccess(user) {
            res.status(200).json({
                user
            })
        },

        function findAllError(err) {
            res.status(500).send("Could not GET Users!")
        }
    )
})
router.get('/:username', (req, res) => {
    User.findOne({ where: {username: req.params.username } })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err))
})


router.put('/update/:id', validateSession,(req, res) => {
    User.update({
        username: req.body.username,
        password: req.body.password,     
        game: req.body.game,
        platform: req.body.platform,
        playlist: req.body.playlist,
        text: req.body.text
    },
    {
        where: {
            id: req.params.id,
            user: req.params.user
        }
    })
    .then(
        function updateSuccess(user) {
            res.status(200).json({
                User: user,
                message: "Player successfully updated!"
            })
        },

        function updateFail(err) {
            res.status(500).json({
                message: err.message
            })
        }
    )
})

router.delete('/delete/:id', validateSession,(req, res) => {
    User.destroy({
        where: {
            id: req.params.id,
            user: req.params.user
        }
    })
    .then(
        function deleteSuccess(user) {
            res.status(200).json({
                User: user,
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