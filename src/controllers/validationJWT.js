const jwt = require("jsonwebtoken");
const {
    ACCESS_TOKEN_SECRET,
  } = process.env;

module.exports = (req, res, next) => {
    
    const data = req.headers.authorization

    const { id } = req.params

    if (!data) {
        return res.status(401).send("Invalid token")
    }

    var token = data.substring(7)
    const validator = jwt.verify(token, ACCESS_TOKEN_SECRET)

    const tokenId = validator.id.toString()

    console.log(tokenId)

    if (validator.id) next()
    else res.status(401).send("Invalid token")

    // next()

    }

    // if (data || id) {
    //     if (id !== tokenId) {
    //         res.status(401).send("Sintax error")
    //     } else {
    //         if (validator.id) next()
    //         else res.status(401).send("Invalid token")
    //     }
    // }

