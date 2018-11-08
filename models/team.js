module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('team', {
        name: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        owner: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return Team;
}