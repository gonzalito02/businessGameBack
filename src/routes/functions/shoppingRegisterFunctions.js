const { ShoppingRegister, Player, Student } = require('../../db')

async function getShoppingRegister () {

    try {

        const shoppingReg = await ShoppingRegister.findAll()

        if (shoppingReg) return shoppingReg
        
        else return "No shopping register found"

    } catch (e) {
        throw new Error("No shopping register found")
    }

}

async function getShoppingRegisterStudentId (id) {

    try {

        var shoppingReg = await ShoppingRegister.findAll({
            where: {studentId: id}
        })

        if (shoppingReg) return shoppingReg
        
        else return "No shopping register found"

    } catch (e) {
        throw new Error(`No shopping register found, student: ${id}`)
    }

}

async function getShoppingRegisterPlayerId (id) {

    try {

        var shoppingReg = await ShoppingRegister.findAll({
            where: {playerId: id},
            //attributes: {exclude: ["studentId"]}
        })

        if (shoppingReg) return shoppingReg
        
        else return "No shopping register found"

    } catch (e) {
        throw new Error(`No shopping register found, player: ${id}`)
    }

}

async function shoppingCreate (id, { 
        period, 
        typeProduct, 
        stockProduct,
        qualityProduct,
        priceProduct, 
        playerId,
    }
    ) {

    try {

    const player = await Player.findByPk(playerId);
    const student = await Student.findByPk(id); 

    const shopping = await ShoppingRegister.create({
        period: period, 
        typeProduct: typeProduct,
        stockProduct: stockProduct,
        qualityProduct: qualityProduct,
        priceProduct: priceProduct 
    })

    const a = await player.addShoppingRegister(shopping);
    const b = await student.addShoppingRegister(shopping);

    if (shopping) return (shopping)
    else return "Cannot create shopping register"

    } catch (e) {
        throw new Error("Cannot create the shopping")
    }

}



module.exports = { getShoppingRegister, getShoppingRegisterStudentId, getShoppingRegisterPlayerId, shoppingCreate }