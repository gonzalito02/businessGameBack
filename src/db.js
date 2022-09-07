require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DATABASE_URL,
} = process.env;
// const {
//   DB_USER, DB_PASSWORD, DB_HOST,
// } = process.env;

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/managame`, {

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectOptions:{
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

console.log("modelos injectados con sequelize: " ,sequelize.models)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Player, GameControl, ActionData, ResultsData, MarketLive, 
  Student, Rol, DinamicForm, QualityRegister, ShoppingRegister, Memory } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Player.hasMany(ActionData) 
ActionData.belongsTo(Player)

Player.hasMany(Student) 
Student.belongsTo(Player)

Player.hasMany(ResultsData) 
ResultsData.belongsTo(Player)

Player.hasMany(MarketLive) 
MarketLive.belongsTo(Player)

Player.hasMany(ShoppingRegister) 
ShoppingRegister.belongsTo(Player)

Student.hasMany(ShoppingRegister) 
ShoppingRegister.belongsTo(Student)

Rol.hasMany(Student) 
Student.belongsTo(Rol)

Rol.hasMany(Player) 
Player.belongsTo(Rol)

Player.hasMany(DinamicForm) 
DinamicForm.belongsTo(Player)

Player.hasMany(QualityRegister) 
QualityRegister.belongsTo(Player)

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
