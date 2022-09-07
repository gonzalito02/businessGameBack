// esto es un ejemplo de que se puende crear funciones y demas para exportarlos como modulos y usarlos en otro archivo.

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('qualityRegister', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qualityA: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    qualityB: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    qualityC: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  });
};
