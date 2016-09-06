'use strict';

module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('author', {
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
        Author.belongsToMany(models.game, { through: models.game_author });
      },
    },
  });

  return Author;
};
