const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { playerCreate } = require('./src/routes/functions/playerFunctions.js');
const { dataPlayer, roles, students } = require("./initialdata.js");
const { gameControlCreate } = require('./src/routes/functions/adminControlFunctions.js');
const { createRole } = require('./src/routes/functions/rolFunctions.js');
const { createStudent } = require('./src/routes/functions/studentFunction.js');

// Syncing all the models at once.

// costo de un punto de calidad.
// tasa maxima de rendimiento de una inversión financiera.
// capital inicial global ?
// costo de produccion de los productos.
// tasa minima de interes de un prestamo.
// montos maximos de inversión y mínimo de producción.
// habilitaciones para comprar o enviar formularios.

function initial () {
  for (data of dataPlayer) {
    playerCreate(data)
  }
  console.log("initialPlayers function executed")
}

function rolesCreateInit () {
  for (data of roles) {
    createRole(data)
  }
  console.log("rolesCreateInit function executed")
}

function studentCreateInit () {
  for (data of roles) {
    createRole(data)
  }
  for (data of students) {
    createStudent(data)
  }
  console.log("studentCreateInit function executed")
}

function gameControlInit () {
  gameControlCreate(
    {
      period: 1,
      taxesRate: 0.35,
      qualityInvCost: 25000,
      productionCapacity: 1000000,
      costProdA: 20000,
      costProdB: 10000,
      costProdC: 5000,
      minProductCapacity: 50,
      minRateLoan: 0.20,
      maxLoanAmount: 150000,
      maxRateFinDinInvest: 0.4,
      maxRateFinFixedInvest: 0.3,
      maxTotalFinInvestAmount: 200000,
      wallet: 0,
      actionGame: 0 // 0 = Production phase; 1 = Market phase; 2 = Clean phase (clearing)  
    }
  )
  console.log("gameControlInit function executed")
}
// actions before start to set up the program

conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, () => {

    // first functions to execute ------------
    initial();
    rolesCreateInit();
    gameControlInit();
    studentCreateInit()
    // ------------
    
    console.log(`%s listening at ${process.env.PORT}`); // eslint-disable-line no-console
  });
});