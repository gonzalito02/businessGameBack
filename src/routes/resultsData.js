const express = require("express")
const validateJwt = require("../controllers/validationJWT.js")
const validationPlayer = require("../controllers/validationPlayer.js")
const { resultsDataCreate, getResultsDataById, getResultsData, updateResultsData, updateBulkResultsData } = require("./functions/resultsDataFunctions.js")
const router = express.Router()

router.post("/:id", async (req, res) => {
    
    const { id } = req.params

    try {

        const resultsData = await resultsDataCreate(id, req.body)
        if (resultsData) return res.send({message: `Results data form created for playerID ${id}`, response: resultsData})
        
    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.put("/:id",  async (req, res) => {

    const { id } = req.params

    try {

        const resultsData = await updateResultsData(id, req.body)
        if (resultsData) return res.send({message: "Results data updated"})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.get("/:id", async (req, res) => {

    const { id } = req.params 

    try {
        
        const resultsData = await getResultsDataById(id)

        if (resultsData) return res.send({message: `resultsData id:${id} obtained`, response: resultsData})

    } catch (e) {
        
        res.status(400).send(e.message)
    
    }

})

router.get("/",  async (req, res) => {

    try {

        const resultsData = await getResultsData()
        if (resultsData) return res.send({message: "resultsData obtained", response: resultsData})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.put("/bulk/increment",  async (req, res) => {

    try {

        const resultsDatas = await updateBulkResultsData(req.body)
        if (resultsDatas) {
            console.log(resultsDatas)
            return res.send({message: "Results data of more than one player done"})
        }

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})


module.exports = router