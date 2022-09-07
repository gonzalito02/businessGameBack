const express = require("express")
const validateJwt = require("../controllers/validationJWT.js")
const validationPlayer = require("../controllers/validationPlayer.js")
const { getShoppingRegister, getShoppingRegisterStudentId, getShoppingRegisterPlayerId, shoppingCreate } = require("./functions/shoppingRegisterFunctions.js")
const router = express.Router()

// aca se construyen las rutas sobre router:

router.get("/", async (req, res) => {

    try {

        const shopping = await getShoppingRegister()
        if (shopping) return res.send({message: "All shopping register obtained", response: shopping})

    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get("/student/:id", async (req, res) => {

    const { id } = req.params
    const { period } = req.body

    try {

        const shopping = await getShoppingRegisterStudentId(id, period)
        if (shopping) return res.send({message: "student shopping register obtained", response: shopping})

    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get("/player/:id", async (req, res) => {

    const { id } = req.params
    const { period } = req.body

    try {

        const qualityReg = await getShoppingRegisterPlayerId(id, period)
        if (qualityReg) return res.send({message: "player shopping register obtained", response: qualityReg})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.post("/:id", async (req, res) => {

    const { 
            period, 
            typeProduct, 
            stockProduct,
            qualityProduct,
            priceProduct, 
            playerId,
        } = req.body
    
    const { id } = req.params

    try {

        const shopping = await shoppingCreate(id, req.body)
        if (shopping) return res.send({message: `shopping created for student ${id}`, response: shopping})

    } catch (e) {
        res.status(400).send(e.message)   
    }

})

module.exports = router