const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('marketLive', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    officialName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fantasyName: {
      type: DataTypes.STRING,
    },
    typeProduct: {
      type: DataTypes.ENUM,
      values: ["A", "B", "C"],
      allowNull: false,
    },
    stockProduct: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    qualityProduct: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    priceProduct: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  });
};
