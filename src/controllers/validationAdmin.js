const jwt = require("jsonwebtoken");
const {
    ACCESS_TOKEN_SECRET,
  } = process.env;

module.exports = (req, res, next) => {
    
    const data = req.headers.authorization

    if (!data) {
        return res.status(401).send("Invalid token")
    }

    var token = data.substring(7)
    const validator = jwt.verify(token, ACCESS_TOKEN_SECRET)

    const role = validator.rol.toString()

    if (role) {
        if (role === "admin") {
            next()
        } else {
            res.status(401).send("Unauthorized")
        }
    }
    else res.status(401).send("Invalid token")

    // next()
}