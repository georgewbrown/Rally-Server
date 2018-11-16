require('dotenv').config()

const express = require('express');
const app = express();


const sequelize = require('./db');
const bodyParser = require('body-parser');

const user = require('./controllers/usercontroller');
const team = require('./controllers/teamcontroller');
const post = require('./controllers/postcontroller');

sequelize.sync(); //tip: {force:true} for resetting
app.use(bodyParser.json());
app.use(require('./middleware/headers'))

app.use('/user',user)
app.use('/team',team)
app.use('/post',post)

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

app.listen(process.env.PORT, () => {console.log(`App is listening on ${process.env.PORT}!`)});
