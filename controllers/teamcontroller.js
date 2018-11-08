let express = require('express')
let router = express.Router()
let sequelize = require('../db');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let Team = sequelize.import('../models/team');
let validateSession = require('../middleware/validate-session')

router.post('/create', (req, res) => {
    Team.create({
        name: req.body.name, // add req.body.team.name when merging with client
        owner: req.body.owner, // add req.body.team.owner when merging with client
    })
    .then(
        function signupSuccess (team) {
            let token = jwt.sign({ id: team.id }, '123_secret',{expiresIn: 60*60*24});
                res.status(200).json ({
                team: team,
                message: 'New Team Created!',
                sessionToken: token
            })
        },
        function signupFail(err) {
            res.status(500).send(err.message)       
        }
    )
})

router.get('/all', (req, res) => {
    Team.findAll()
    .then(
        function findAllSuccess(team) {
            res.status(200).json({
                team
            })
        },

        function findAllError(err) {
            res.status(500).send("Could not GET Team's!")
        }
    )
})
router.get('/:name', (req, res) => {
    Team.findOne({ where: {name: req.params.name } })
    .then(team => res.status(200).json(team))
    .catch(err => res.status(500).json(err))
})


router.put('/update/:id',(req, res) => {
    Team.update({
        name: req.body.name, // add req.body.team.name when merging with client
        owner: req.body.owner, // add req.body.team.owner when merging with client
    },
    {
        where: {
            id: req.params.id,
            // user: req.team.id
        }
    })
    .then(
        function updateSuccess(team) {
            res.status(200).json({
                Team: team,
                message: "Team has been successfully updated!"
            })
        },

        function updateFail(err) {
            res.status(500).json({
                message: err.message
            })
        }
    )
})

router.delete('/delete/:id',(req, res) => {
    Team.destroy({
        where: {
            id: req.params.id,
            // user: req.team.id
        }
    })
    .then(
        function deleteSuccess(team) {
            res.status(200).json({
                Team: team,
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