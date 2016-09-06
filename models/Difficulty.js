'use strict';

module.exports = (sequelize, DataTypes) => {
  const Difficulty = sequelize.define('difficulty', {
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
        Difficulty.belongsToMany(models.game, { through: models.game_difficulty });
      },
    },
  });

  return Difficulty;
};
