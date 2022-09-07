const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dinamicForm', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    period: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM,
        values: ["loan", "investment"],
        allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    descriptionClose: {
      type: DataTypes.TEXT,
    },
    clearingPeriod: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    validateByAdmin: {
      type: DataTypes.INTEGER, // 0 pendiente, 1 validado, 2 rechazado
        defaultValue: 0
    },
    idControl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  });
};
