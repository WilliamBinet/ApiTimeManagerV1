'use strict';
module.exports = (sequelize, DataTypes) => {
  let Clocking = sequelize.define('Clocking', {
    id: {
      primaryKey: true,
      type : DataTypes.INTEGER,
    },
    time: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    id_user: DataTypes.INTEGER
  }, {});
  Clocking.associate = function(models) {
    models.Clocking.belongsTo(models.User,
        {
          foreignKey : {
            name : 'id_user',
            allowNull : false
          }
        })
  };
  return Clocking;
};
