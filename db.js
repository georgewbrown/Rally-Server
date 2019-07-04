const Sequelize = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres'  
});
sequelize.authenticate().then(
    function(){
        console.log('Connected to blue-badge-database postgres database');
    },
    function(err){
        console.log("Error");
        console.log(err);
    }
   
);

module.exports = sequelize;