'use strict';

module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('genre', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Genre.belongsToMany(models.game, { through: models.game_genre });
      },
    },
  });

  return Genre;
};
