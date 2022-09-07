const express = require("express")
const validateJwt = require("../controllers/validationJWT.js")
const validationPlayer = require("../controllers/validationPlayer.js")
const { marketOfferDecrement } = require("./functions/marketLiveFunctions.js")
const { updateBulkResultsData } = require("./functions/resultsDataFunctions.js")
const { shoppingCreate } = require("./functions/shoppingRegisterFunctions.js")
const { walletDecrement } = require("./functions/studentFunction.js")
const router = express.Router()

        //   0:
        //     id: 12345678
        //     purchase:
        //         period: 1
        //         playerId: 1003
        //         priceProduct: 20000
        //         qualityProduct: 22
        //         stockProduct: 2
        //         typeProduct: "A"

router.put("/",  async (req, res) => {

    const { global, wallet } = req.body

    try {

        var errors = []

        for (var i = 0; i < global.length; i++) {
            const marketRes = await marketOfferDecrement(global[i].purchase)
            
            if (marketRes === "No stock") errors.push({id: global[i].purchase.playerId, global: global[i].purchase, error: "No stock"})
            else if (marketRes === "No product found") errors.push({id: global[i].purchase.playerId, global: global[i].purchase, error: "No product found"})
            else (console.log(`Purchase ${global[i].purchase.playerId}, ${global[i].purchase} done`))

            const shopRes = await shoppingCreate(global[i].id, global[i].purchase)
            if (!shopRes) console.log("Cant update the shoppingRegister for", global[i].id)
            else if (shopRes === "Cannot create shopping register") errors.push({id: global[i].purchase.playerId, global: global[i].purchase, error: "Cant create shoppingRegister"})
        }

        await walletDecrement(wallet)

        let batch = await updateBulkResultsData(global)
        if (batch) res.send(errors)
        else res.send("Cant resolve updateBulkResultsData")

    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    
    }
})


module.exports = router