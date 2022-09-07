// con las siguientes líneas de codigo inicilizamos el archivo para colocar las rutas de forma que luego
// puedan ser llamadas como modulo.

const express = require("express")
const validateJwt = require("../controllers/validationJWT.js")
const validationPlayer = require("../controllers/validationPlayer.js")
const { getMemories, createMemory, destroyMemory } = require("./functions/memoryFunctions.js")
const router = express.Router()

// aca se construyen las rutas sobre router:

router.get("/",  async (req, res) => {

    try {

        const memories = await getMemories()

        if (memories) return res.send({message: "memories obtained", response: memories})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.post("/", async (req, res) => {

    try {

        const memory = await createMemory(req.body)

        if (memory) return res.send({message: `memory created `, response: memory})
    
    } catch (e) {

        res.status(400).send(e.message)
    
    }

})

router.delete("/:id", async (req, res) => {

    const { id } = req.params

    try {

        const memory = await destroyMemory(id)
        if (memory) return res.send({message: "Memory destroy", response: memory})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

module.exports = router