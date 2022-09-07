const express = require("express")
const validateJwt = require("../controllers/validationJWT.js")
const validationPlayer = require("../controllers/validationPlayer.js")
const { getQualityRegister, getQualityRegisterId, deleteQualityRegister } = require("./functions/qualityRegisterFunctions.js")
const router = express.Router()

// aca se construyen las rutas sobre router:

router.get("/", async (req, res) => {

    try {

        const qualityReg = await getQualityRegister()
        if (qualityReg) return res.send({message: "dinamic forms obtained", response: qualityReg})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.get("/:id", async (req, res) => {

    const { id } = req.params
    const { period } = req.body

    try {

        const qualityReg = await getQualityRegisterId(id, period)
        if (qualityReg) return res.send({message: "quality register obtained", response: qualityReg})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

// validateJwt, validationPlayer

router.delete("/:id", async (req, res) => {

    let { id } = req.params
    let { period } = req.body

    if ( !period || !id ) res.send({error:true, message: "missing data"})

    try {

        const qualityReg = await deleteQualityRegister(id, req.body)
        if (qualityReg) return res.send({message: "Quality register deleted"})

    } catch (e) {
        
        res.status(400).send(e.message)
    
    }
})

module.exports = router