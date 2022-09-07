const express = require("express")
const validationAdmin = require("../controllers/validationAdmin.js")
const validationJWT = require("../controllers/validationJWT.js")
const { gameControlCreate, getGameControl, updateGameControl, validateActionForms, validateDinamicForms,
     deleteForm, getAdminForms, walletSet, updateWallet } = require("./functions/adminControlFunctions.js")
const router = express.Router()


router.get("/",  async (req, res) => {

    try {

        const gameControl = await getGameControl()
        if (gameControl) return res.send({message: "gameControls getted", response: gameControl})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.post("/",  async (req, res) => {

    let { variables } = req.body
    
    if ( !variables ) res.send({error:true, message: "missing data"})

    try {

        const gameControl = await gameControlCreate(req.body)
        if (gameControl) return res.send({message: "gameControl created"})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.put("/", validationAdmin, validationJWT, async (req, res) => {
    
    if ( !req.body ) res.send({error:true, message: "missing data"})

    try {

        const gameControl = await updateGameControl(req.body)
        if (gameControl) return res.send({message: "gameControl update"})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})


//la siguiente accion valida un formulario
//  |
//  |
//  V

router.put("/validate", validationAdmin, validationJWT, async (req, res) => {

    
    let { period, playerId, validate, type } = req.body
    if ( !period || !playerId || !validate) res.send({error:true, message: "missing data"})

    try {

        if (type === "loan" || type === "investment") {
            const validate = await validateDinamicForms(req.body)
        } else {
            const validate = await validateActionForms(req.body)
        }

        if (validate) return res.send({message: "form validated succesfully"})

    } catch (e) {
        
        res.status(400).send(e.message)
    
    }
})

//la siguiente accion elimina un formulario
//  |
//  |
//  V

router.delete("/", validationAdmin, validationJWT, async (req, res) => {

    let { period, playerId } = req.body

    if ( !period || !playerId ) res.send({error:true, message: "missing data"}) 

    try {

        const form = await deleteForm(req.body)
        if (form) return res.send({message: `form destroyed`})
        else res.status(400).send({message: `cannot destroy`})

    } catch (e) {

        res.status(400).send(e.message)
    
    }

})

router.get("/getFormsValidate", async (req, res) => {

    try {

        const forms = await getAdminForms(req.body)
        if (forms) return res.send({message: "pendding forms obtained", response: forms})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.put("/wallet/set", validationAdmin, validationJWT, async (req, res) => {

    try {

        const wallet = await walletSet(req.body)

        if ( wallet ) return res.send(wallet)

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.put("/walletAdmin", validationAdmin, validationJWT, async (req, res) => {

    try {

        const wallets = await updateWallet(req.body.id, req.body.value)

        if ( wallets ) return res.send(wallets)

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

module.exports = router