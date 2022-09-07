const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('student', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    wallet: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    email:{
      type: DataTypes.STRING,
    },
  });
};

