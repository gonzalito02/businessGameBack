const express = require("express")
const router = express.Router()
const validationAdmin = require("../controllers/validationAdmin.js")
const validationJWT = require("../controllers/validationJWT.js")
const { Student } = require('../db.js')
const { getStudents, createStudent, getStudentId, updateStudent, walletDecrement, deleteStudent, playerAdd, playerRemove } = require("./functions/studentFunction.js")

// aca se construyen las rutas sobre router:

router.get("/",  async (req, res) => {

    try {

        const students = await getStudents()
        if (students) return res.send({message: "getStudents ok", response: students})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})


router.post("/", validationAdmin, validationJWT, async (req, res) => {

    let { id, name, password, email, rol } = req.body

    if (!id || !name || !password || !rol) res.send({error:true, message: "missing data"})

    try {

        const newStudent = await createStudent(req.body)
        if (newStudent) return res.send({message: "student created"})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.get("/:id", async (req, res) => {

    const { id } = req.params 

    try {

        const student = await getStudentId(id)
        if (student) return res.send({message: "student obtained", response: student})

    } catch (e) {

        res.status(400).send(e.message)
    
    }

})

router.put("/:id",  async (req, res) => {

    const { id } = req.params

    try {

        const student = await updateStudent(id, req.body)

        if ( student ) return res.send(student)

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.put("/player/add",  async (req, res) => {

    try {

        const student = await playerAdd(req.body)
        if ( student ) return res.send(student)

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.put("/player/remove",  async (req, res) => {

    try {

        const student = await playerRemove(req.body)
        if ( student ) return res.send(student)

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.put("/wallet/decrement",  async (req, res) => {

    try {

        const wallet = await walletDecrement(req.body)

        if ( wallet ) return res.send(wallet)

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.delete("/:id", validationAdmin, validationJWT, async (req, res) => {

    const { id } = req.params

    try {

        const student = await deleteStudent(id)

        if ( student ) return res.send("student deleted")

    } catch (e) {

        res.send(e.message)
    
    }
})


module.exports = router