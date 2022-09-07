const bcrypt = require("bcrypt")
const { Student, Player } = require('../../db')
const jwt = require("jsonwebtoken")
const {
    ACCESS_TOKEN_SECRET,
  } = process.env;

// para el login, se utilizara un marcador en el front para diferenciar a los estudiantes de las empresas,
// por lo que el login sera funcional para ambos.

async function loginEnter (data) {

    const { id, password, type } = data

    try {

        if (!id || !password) return "Invalid user or password"

        if (type) {
            var agent = await Player.findByPk(id)
            
            var res = {
                id: agent.dataValues.id,
                name: agent.dataValues.officialName,
                rol: agent.dataValues.rolName
            }
        } else {
            var agent = await Student.findByPk(id)
            
            var res = {
                id: agent.dataValues.id,
                name: agent.dataValues.name,
                rol: agent.dataValues.rolName
            }
        }
        
        const verifyPassword = await bcrypt.compare(password, agent.dataValues.password)
        
        if (!verifyPassword) return "Invalid user or password"
        
        const dataForToken = {...res}

        const token = jwt.sign(dataForToken, ACCESS_TOKEN_SECRET, {
            expiresIn: 60 * 60 * 24
        })

        res.token = token

        return res

    } catch (e) {

        throw new Error("Sintax error")

    }
    
}

module.exports = { loginEnter }