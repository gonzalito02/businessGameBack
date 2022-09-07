// esto es un ejemplo de que se puende crear funciones y demas para exportarlos como modulos y usarlos en otro archivo.

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('player', {
    id: {
      type: DataTypes.INTEGER, //la idea es que las empresas tengan un numero de identificacion corto, del estilo 100 y el numero: 1001
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    officialName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fantasyName: {
      type: DataTypes.STRING,
    },
    group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    members: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    resultsAcc: {
      type: DataTypes.INTEGER,
    },
    initialCapital: {
      type: DataTypes.INTEGER,
      defaultValue: 1000000
    },
    index: {
      type: DataTypes.INTEGER,
      defaultValue: 1000
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    allowToPlay:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
};

