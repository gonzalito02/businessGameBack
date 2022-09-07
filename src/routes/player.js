const express = require("express")
const router = express.Router()
const validationAdmin = require("../controllers/validationAdmin.js")
const validationJWT = require("../controllers/validationJWT.js")
const { Player } = require('../db.js')
const { playerCreate, getPlayers, getPlayer, updatePlayer, allowToPlayFunc } = require("./functions/playerFunctions.js")

// aca se construyen las rutas sobre router:

router.get("/",  async (req, res) => {

    try {

        const players = await getPlayers()

        if (players) return res.send({message: "getPlayers ok", response: players})

    } catch (e) {
        res.status(400).send(e.message)
    }
})


router.post("/", validationAdmin, validationJWT, async (req, res) => {

    let { id, officialName, group, members, password } = req.body
    if (!id || !officialName || !group || !members || !password) res.send({error:true, message: "missing data"})

    try {

        const newPlayer = await playerCreate(req.body)
        if (newPlayer) return res.send({message: "player created"})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.get("/:id", async (req, res) => {

    const { id } = req.params 

    try {

        const player = await getPlayer(id)
        if (player) return res.send({message: "player obtained", response: player})

    } catch (e) {

        res.status(400).send(e.message)
    
    }

})

router.put("/:id",  async (req, res) => {

    const { id } = req.params

    try {

        const resp = await updatePlayer(id, req.body)
        if ( resp ) return res.send(resp)

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.put("/allowToPlay/:id", async (req, res) => {

    const { id } = req.params

    try {

        const resp = await allowToPlayFunc(id)
        if ( resp ) return res.send(resp)

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})


module.exports = router