const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('shoppingRegister', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    totalQuality: {
      type: DataTypes.INTEGER,
      get() {
        return this.qualityProduct * this.stockProduct  
      },
      set () {
        throw new Error('Do not try to set totalQuality value!');
      }
    },
    totalShop: {
      type: DataTypes.INTEGER,
      get() {
        return this.priceProduct * this.stockProduct  
      },
      set () {
        throw new Error('Do not try to set totalQuality value!');
      }
    }
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  });
};
