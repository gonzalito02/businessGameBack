// esto es un ejemplo de que se puende crear funciones y demas para exportarlos como modulos y usarlos en otro archivo.


// game control:

// todo lo que altera el equilibrio, es una variable que debe estar aca (que no sea el precio de venta ni decisiones de inversión):

// tratar con un json para definir las variablese que seran utilizadas en el form del inicio.

// costo de un punto de calidad.
// tasa maxima de rendimiento de una inversión financiera.
// capital inicial global ?
// costo de produccion de los productos.
// tasa minima de costo de un prestamo.
// montos maximos de inversión y mínimo de producción.
// habilitaciones para comprar o enviar formularios.

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('gameControl', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    variables: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
};
