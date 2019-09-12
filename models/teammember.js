'use strict';
module.exports = (sequelize, DataTypes) => {
  const TeamMember = sequelize.define('TeamMember', {
    id_user: DataTypes.INTEGER,
    id_team: DataTypes.INTEGER
  }, {});
  TeamMember.associate = function(models) {
    models.TeamMember.belongsTo(models.User,
        {
          foreignKey : {
            allowNull : false
          }
        });
    models.TeamMember.belongsTo(models.User,
        {
          foreignKey : {
            allowNull : false
          }
        })
  };
  return TeamMember;
};
