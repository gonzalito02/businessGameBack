const express = require("express")
const router = express.Router()
const validationAdmin = require("../controllers/validationAdmin.js")
const validationJWT = require("../controllers/validationJWT.js")
const { MarketLive } = require('../db.js')
const { getMarketLive, marketOfferInsert, marketOfferDecrement, destroyMarketLive, getMarketLiveForDownload, updatePlayerMarket } = require("./functions/marketLiveFunctions.js")

router.get("/",  async (req, res) => {

    try {

        const market = await getMarketLive()
        if (market) return res.send({message: "market obtained", response: market})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.get("/forDownload",  async (req, res) => {

    try {

        const market = await getMarketLiveForDownload()
        if (market) return res.send({message: "market obtained", response: market})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.post("/:id",  async (req, res) => {

    const { id } = req.params

    try {

        const marketOffer = await marketOfferInsert(id, req.body)
        if (marketOffer) return res.send({message: "Market offer inserted"})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.post("/bulk/insert",  async (req, res) => {

    try {

        var errors = []

        for (var i = 0; i < req.body.length; i++) {
            const response = await marketOfferInsert(req.body[i].id, req.body[i].insert)
            if (response === "No player found") errors.push({id: req.body[i].id, insert: req.body[i].insert})
            else (console.log(`Insert ${req.body[i].id}, ${req.body[i].insert} to market`))
        }

        if (errors.length > 0) {res.send({message: "Insert products with errors, check out the log"}); console.log(errors)}
        else (res.send({message: "Insert products to market done"}))

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})


// la siguiente url simula una salida de stock del mercado:

router.put("/:id",  async (req, res) => {

    const { id } = req.params

    try {

        const marketOffer = await marketOfferDecrement(id, req.body)
        if (marketOffer === "No stock") return res.send({message: "There is no enough stock"})
        else return res.send({message: "Decrement done"})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.put("/bulk/decrement",  async (req, res) => {

    try {
        var errors = []

        for (var i = 0; i < req.body.length; i++) {
            const response = await marketOfferDecrement(req.body[i].purchase)
            if (response === "No stock") errors.push({id: req.body[i].purchase.playerId, purchase: req.body[i].purchase})
            else if (response === "No product found") errors.push({id: req.body[i].purchase.playerId, purchase: req.body[i].purchase})
            else (console.log(`Purchase ${req.body[i].purchase.playerId}, ${req.body[i].purchase} done`))
        }

        if (errors.length > 0) return (res.send({message: "Purchase with errors, check out the log"}), console.log(errors))
        else res.send({message: "Purchase done"})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.put("/player/increment", async (req, res) => {

    try {

        const marketUpdate = await updatePlayerMarket(req.body)
        
        if (marketUpdate) res.send({message: "Updated"})
        else res.send({message: "Cant update the market"})

    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    
    }
})

router.delete("/", validationAdmin, validationJWT, async (req, res) => {

    try {

        const market = await destroyMarketLive()
        if (market) return res.send({message: "Market destroy", response: market})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

module.exports = router