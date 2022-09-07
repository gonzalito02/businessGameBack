// configuración para empezar a trabajar - se usa require sin la necesidad de incluir la ruta (en este caso de express) 
// porque esta instalado como modulo

const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require('cors');
app.use(cors()) //aplicamos el middleware para esquivar las cors
const {
   CORS_URL,
 } = process.env;

const server = http.createServer(app)

const io = new Server (server, {
   cors:{
      origin: CORS_URL,
      methos: ["GET","POST", "PUT", "DELETE"]
   }
})

io.on("connection", (socket) => {
   console.log("User conected: ", socket.id)
   socket.on("sendMessage", (data) => {
      console.log(data);
      socket.broadcast.emit("receiveMessage", data)
   })
})

const login = require("./routes/login.js")
const forms = require("./routes/form.js")
const dinamicForms = require("./routes/dinamicForm.js")
const player = require("./routes/player.js")
const student = require("./routes/student.js")
const adminControl = require("./routes/adminControl.js")
const marketLive = require("./routes/marketLive.js")
const resultsData = require("./routes/resultsData.js")
const qualityRegister = require("./routes/qualityRegister.js")
const shoppingRegister = require("./routes/shoppingRegister.js")
const manager = require("./routes/manager.js")
const memory = require("./routes/memory.js")


// esto nos devuelve un funcion.
// sin invoco a express, le doy inicio al servidor:


// const ioServer = new Server(server)


// ahora falta el listen (al final por una cuestión de orden de este proyecto):
// este metodo recibe el numero que indica el puerto al que esta escuchando y por callback le mandamos un console.log para verlo en la consola
// funcionando.

//la estructura para armar las rutas es la siguiente (estos son los endpoints)
//constante inyectada con express mas metodo.

//server.METHOD(path, (req, res, next) => {
// -----------contenido----------
// en el caso de que no se use res, se puede utilizar un next() para que, una vez terminado la ejecucion de la ruta que encontre
// continue con la proxima ruta que coincida tambien.
//})

// dato aparte: el navegador por defecto hace un get al servidor.

// el next de la funcion permite delegar la tarea, sin la necesidad de que el endpoint brinde una respuesta a quien la solicito.
// esto puede ser util para los middleware: se pueden definir antes de las rutas e incluirlos en los metodos. Ej:
// server.get("/", "nombredelmiddleware", (req, res, next) => { contenido })
// por lo tanto, si defino un middleware:
// function logger(req, res, next) => { algun calculo; next()}
// buscará la ruta que matchee, ejecutará el middleware si esta en los argumentos, y luego seguira con la ejecución.

// los middleware, principalmente, son funciones.


// para poder hacer un seguimiento en la consola de todas las consultas que se hacen al back, se puede utilizar morgan,
// indicandole a todo el server que debe pasar por ahi antes. Tambien se podría hacer con el logger arriba definido,
// y ponerlo como argunmento en todas las funciones. 

// primero instalar morgan. luego requerirlo. Morgan es un middleware.

// luego, para la comunicación, en lo que respecta a interpretar los datos que llegan, hay que utilizar otro middleware:
// para identificar los .json.
// para ello, se realiza la siguiente línea de codigo (debajo de la declaración de morgan)

const morgan = require("morgan")

app.use(morgan("dev"))
app.use(express.json()) // con esto le indico como interpretar un json => traduciendolo a un objeto.
// con ello se puede hacer un destructuring de lo que llegue. Ej en ruta post

// middleware para evitar los cors: 

// server.use((req, res, next) => {

//     // Dominio que tengan acceso (ej. 'http://example.com')
//        res.setHeader('Access-Control-Allow-Origin', '*');
    
//     // Metodos de solicitud que deseas permitir
//        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
//     // Encabecedados que permites (ej. 'X-Requested-With,content-type')
//        res.setHeader('Access-Control-Allow-Headers', '*');
    
//     next();
// })


// para configurar el routeo ( y poder trabajar con modulos ), se debe realizar lo siguiente:
// en concreto, indicarle donde buscar las rutas en el caso de que la solicitud tenga lo indicado:
// para ello es importante importar el archivo, realizado mas arriba:

app.use("/login", login)
app.use("/form", forms)
app.use("/dinamicForm", dinamicForms)
app.use("/player", player)
app.use("/student", student)
app.use("/adminControl", adminControl)
app.use("/market", marketLive)
app.use("/resultsData", resultsData)
app.use("/qualityRegister", qualityRegister)
app.use("/shoppingRegister", shoppingRegister)
app.use("/manager", manager)
app.use("/memory", memory)

// EL ORDEN DE LOS MIDDLEWARES SI IMPORTAN, seguir con el que está planteado aca.


// io.get("/", (req, res) => {
//     res.send("esto sería la pagina principal")
// })

// server.post("/", (req, res) => {
//     let {id, data, loQueSea} = req.body  // ejemplo de destructuring, que puede ser un json enviado como request
// })

// si en una ruta pongo /:algo, luego lo puedo llamar por destructuring con req.params. Debe tener el mismo nombre:
// en este caso sería { algo } = req.params. Puedo tener varios: /:algo/:otroAlgo

// para indicar que hay una query, se hace con ?: ruta/?nombre=gonzalo => en este caso, req.query será gonzalo.

// server.listen(3000, () => {console.log("listen on port 3000")})  ======> esto esta en el archivo index.js en api

// exportamos el server para que pueda ser utilizado por el archivo index.js

module.exports = server;