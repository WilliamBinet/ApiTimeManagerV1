'use strict';
module.exports = (sequelize, DataTypes) => {
    const WorkingTime = sequelize.define('WorkingTime', {
        id: {
            primaryKey: true,
            type : DataTypes.INTEGER,
        },
        id_user: DataTypes.INTEGER,
        start: DataTypes.DATE,
        end: DataTypes.DATE
    }, {});
    WorkingTime.associate = function (models) {
        models.WorkingTime.belongsTo(models.User,
            {
                foreignKey: {
                    name : 'id_user',
                    allowNull: false
                }
            })
    };
    return WorkingTime;
};
