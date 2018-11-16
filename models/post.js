module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('post', {
        owner: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 30]
            }
        },

        platform: {
            allowNull: false,
            type: DataTypes.ENUM("XB1", "PS4", "Blizzard.NET")
        },

        playlist: {
            allowNull: false,
            type: DataTypes.ENUM("COMPETITIVE", "CASUAL")
        },

        mic: {
            allowNull: false,
            type: DataTypes.ENUM("MIC", "NO-MIC")
        },

        players: {
            allowNull: true,
            type: DataTypes.STRING,

        },
        rank: {
            allowNull: true,
            type: DataTypes.ENUM("BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND", "MASTER", "GRANDMASTER")
        },

        text: {
            allowNull: false,
            type: DataTypes.CHAR
        }
    })

    return Post;
}