
module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        id: {
            primaryKey: true,
            type : DataTypes.INTEGER,
        },
        username: DataTypes.STRING,

        email: DataTypes.STRING,
        password: DataTypes.STRING,
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        id_role: DataTypes.INTEGER
    });
    User.associate = function (models) {
        models.User.belongsTo(models.Role,
            {
                foreignKey: {
                    allowNull: false,
                    name: 'id_role'
                }
            });
    };
    return User;
};
