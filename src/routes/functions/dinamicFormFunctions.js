const { resultsDataCreate } = require("./resultsDataFunctions")
const { DinamicForm, Player } = require('../../db')

async function getDinamicForms () {

    try {

        const dinForms = await DinamicForm.findAll()

        if (dinForms[0].dataValues.playerId > 0) return dinForms
        
        else return "No dinamic forms found"

    } catch (e) {
        throw new Error("No dinamic forms found")
    }

}

async function getDinamicFormId (id) {

    try {

        const dinamicForm = await DinamicForm.findAll({
            where: {playerId: id}
        })

        if (dinamicForm[0].dataValues.playerId > 0) return dinamicForm
        
        else return "No dinamic form found"

    } catch (e) {
        throw new Error(`No dinamic forms found, playerID: ${id}`)
    }

}

// async function destroyDinamicFormId(id, period) {

//     try {

//         const dinamicForm = await DinamicForm.destroy({
//             where: {playerId: id, period: period}
//         })

//         if (dinamicForm) return dinamicForm
        
//         else return "No dinamic form found"

//     } catch (e) {
//         throw new Error(`No dinamic forms found, playerID: ${id}`)
//     }

// }

async function dinamicFormCreate (playerID,
    {
        period, 
        type,
        amount, 
        rate,
        description,
        clearingPeriod
    }
    ) {

    var dataControl = playerID.toString() + period.toString() + type

    if (!period || !type || !amount || !rate) return "missing data"

    if (type === "loan" && !clearingPeriod) return "missing clearing period"

    try {
        
    var dinamicExist = await DinamicForm.findOne({ where: { playerId: playerID, period: period, type: type }}); 



    if (dinamicExist) {if(amount) {
        await dinamicExist.increment("amount", {by: amount})
        return dinamicExist
    }}

    else {

    const player = await Player.findOne({ where: { id: playerID } });

    const newDinamicForm = await DinamicForm.create({
        period: period,  
        type: type,
        amount: amount, 
        rate: rate,
        description: description,
        clearingPeriod: clearingPeriod,
        idControl: dataControl
    })

    await player.addDinamicForm(newDinamicForm);

    console.log(newDinamicForm)

    if (newDinamicForm) return (newDinamicForm)

    }

    } catch (e) {
        console.log(e)
        throw new Error("Cannot create the dinamic form")
    }

}

async function closeDinamicForm ({ 
    period, 
    playerId, 
    amount, 
    rate, 
    description }
) {

    try {

        const closer = await DinamicForm.update(
            {
                amount: amount,
                rate: rate,
                descriptionClose: description,
                status: true
            },
            {
                where: {
                    playerId: playerId,
                    period: period,
                    type: "investment",
                }
            }
            );

        return closer

    } catch (e) {
        throw new Error("Cannot close the indicated form")
    }

}

async function destroyDinamicForm(playerId, period) {

    try {

        // const dataFor = await ActionData.findByPk(id) 

        // if (dataFor) {
        //     var idPlayer = dataFor.dataValues.playerId
        //     var period = dataFor.dataValues.period
        // }

        // console.log(idPlayer, period)

        const dinamicForm = await DinamicForm.destroy({
            where: {
                playerId: playerId,
                period: period
            }
        })

        if (dinamicForm) return dinamicForm 

    } catch (error) {

        throw new Error("Cannot destroy the form. Try again.")
    
    }
}

module.exports = { getDinamicForms, dinamicFormCreate, getDinamicFormId, closeDinamicForm, destroyDinamicForm}