const {
    DataTypes
} = require('sequelize');
  // Exportamos una funcion que define el modelo
  // Luego le injectamos la conexion a sequelize.
  module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('memory', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    }, {
      timestamps: true,
      createdAt: true,
      updatedAt: true,
    });
  };