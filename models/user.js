module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
            game:{
                allowNull: true,
                type: DataTypes.ENUM("Overwatch","Destiny 2","SMITE")
            },
            platform: {
                allowNull: true, 
                type: DataTypes.ENUM("XB1","PS4","PC")
            },
            playlist: {
                allowNull: true,
                type: DataTypes.ENUM("Competitive", "Casual")
            },
            text: {
                allowNull: true,
                type: DataTypes.CHAR
            }
        })
    
return User;
}