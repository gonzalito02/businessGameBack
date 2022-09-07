// con las siguientes líneas de codigo inicilizamos el archivo para colocar las rutas de forma que luego
// puedan ser llamadas como modulo.

const express = require("express")
const validateJwt = require("../controllers/validationJWT.js")
const validationPlayer = require("../controllers/validationPlayer.js")
const router = express.Router()
const { formCreate, getForms, getForm, destroyForm} = require("./functions/formFunctions.js")
const { disallowToPlay} = require("./functions/playerFunctions.js")

// aca se construyen las rutas sobre router:

router.get("/",  async (req, res) => {

    try {

        const forms = await getForms()
        if (forms) return res.send({message: "forms obtained", response: forms})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.get("/:id", async (req, res) => {

    const { id } = req.params 

    try {
        
        const form = await getForm(id)
        if (form) return res.send({message: `forms id:${id} obtained`, response: form})

    } catch (e) {
        
        res.status(400).send(e.message)
    
    }

})

router.post("/:id", async (req, res) => {
    
    const { id } = req.params

    try {

        const newForm = await formCreate(id, req.body)

        //change to false allowToPlay:
        await disallowToPlay(id)

        if (newForm) return res.send({message: `form created for playerID ${id}`, response: newForm})
    
    } catch (e) {

        res.status(400).send(e.message)
    
    }

})

router.delete("/:id", async (req, res) => {
    
    const { id } = req.params

    try {

        const form = await destroyForm(id)

        if (form) return res.send({message: `form deleted`, response: form})
    
    } catch (e) {

        res.status(400).send(e.message)
    
    }

})

module.exports = router