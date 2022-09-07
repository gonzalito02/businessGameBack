const jwt = require("jsonwebtoken")
const express = require("express")
const { loginEnter } = require("./functions/loginFunctions")
const router = express.Router()

router.post("/",  async (req, res) => {

    try {

        const agent = await loginEnter(req.body)

        if (agent === "Invalid user or password") return res.send({message: "Invalid user or password"})
        if (agent) return res.send({message: "Login ok", response: agent})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

module.exports = router