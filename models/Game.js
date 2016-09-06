'use strict';

module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('game', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Game.belongsToMany(models.genre, { through: models.game_genre });
        Game.belongsToMany(models.difficulty, { through: models.game_difficulty });
      },
    },
  });
  return Game;
};
