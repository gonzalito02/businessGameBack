// esto es un ejemplo de que se puende crear funciones y demas para exportarlos como modulos y usarlos en otro archivo.

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('resultsData', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    taxesRate: {
      type: DataTypes.FLOAT,
      defaultValue: 0.35,
    },
    totalSales: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    finantialInvestmentResults: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    qualityInvestment: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    productionInvestment: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    finantialInvestment: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    loanInterest: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    grossProfit: {
      type: DataTypes.INTEGER,
      get () {
        return (this.totalSales - this.productionInvestment)
      },
      set () {
        throw new Error('Do not try to set the grossProfit value!');
      }
    },
    extraResults: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    taxes: {
      type: DataTypes.INTEGER,
      get () {
        var total = (this.totalSales - this.productionInvestment + this.finantialInvestmentResults + this.extraResults - this.loanInterest ) * this.taxesRate
        if (total > 0) return total
        else return 0
      },
      set () {
        throw new Error('Do not try to set the taxes value!');
      }
    },
    observations: {
      type: DataTypes.STRING,
    },
    totalPeriod: {
      type: DataTypes.INTEGER,
      get() {
        return this.totalSales - this.productionInvestment + this.finantialInvestmentResults - this.loanInterest + this.extraResults - this.taxes
      },
      set () {
        throw new Error('Do not try to set the totalPeriod value!');
      }
    },
    idControl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  });
};
