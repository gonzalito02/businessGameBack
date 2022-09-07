const { ActionData, DinamicForm, QualityRegister, Player} = require('../../db');
const { destroyDinamicFormId, destroyDinamicForm } = require('./dinamicFormFunctions');

async function formCreate (playerID,
    {
        period, 
        taxesRate,
        priceA, 
        qualityA,
        quantityA,
        priceB, 
        qualityB,
        quantityB,
        priceC, 
        qualityC,
        quantityC,
        qualityInvestment,
        productionInvestment,
        finantialInvestment,
        finantialFixedInvestment,
        finantialFixedRentability
    }
    ) {

    const dataControl = playerID.toString() + period.toString() + "actionForm"

    try {

    const player = await Player.findOne({ where: { id: playerID } });

    const newForm = await ActionData.create({
        period: period,  
        taxesRate: taxesRate,
        priceA: priceA, 
        qualityA: qualityA,
        quantityA: quantityA,
        priceB: priceB, 
        qualityB: qualityB,
        quantityB: quantityB,
        priceC: priceC, 
        qualityC: qualityC,
        quantityC: quantityC,
        qualityInvestment: qualityInvestment,
        productionInvestment: productionInvestment,
        finantialInvestment: finantialInvestment,
        finantialFixedInvestment: finantialFixedInvestment,
        finantialFixedRentability: finantialFixedRentability,
        idControl: dataControl

    })

    const newQualityRegister = await QualityRegister.create({
        period: period,
        qualityA: qualityA,
        qualityB: qualityB,
        qualityC: qualityC
        }
    )

    await player.addActionData(newForm);
    const a = await player.addQualityRegister(newQualityRegister);
    if (newForm) return (newForm)

    } catch (e) {
        console.log(e)
        throw new Error("Cannot create the form")
    }

}

async function getForms () {

    try {

    const forms = await ActionData.findAll()

    if (forms[0].dataValues.id > 0) return forms
    else return "No forms found"

    } catch (e) {
        throw new Error("No forms found")
    }

}

async function getPenddingForms () {

    try {

    const forms = await ActionData.findAll({
        where:{
            validateByAdmin: false
        }
    })

    if (forms[0].dataValues.id > 0) return forms
    else return "No forms found"

    } catch (e) {
        throw new Error("No pedding for validate forms found")
    }

}

async function getForm(id) {

    try {

        const forms = await ActionData.findAll({ where: {playerId: id}})
        const dinamicforms = await DinamicForm.findAll({ where: {playerId: id}})
        
        if (forms || dinamicforms) return forms.concat(dinamicforms)
        else return "No forms found"

    } catch (e) {
        throw new Error(`No forms found, playerID: ${id}`)
    }

}

async function destroyForm(id) {

    try {

        const dataFor = await ActionData.findByPk(id) 

        if (dataFor) {
            var playerId = dataFor.dataValues.playerId
            var period = dataFor.dataValues.period
            const dinamic = await destroyDinamicForm(playerId, period)
        }

        const form = await ActionData.destroy({
            where: {
                id: id
            }
        })

        if (form) return form 

    } catch (error) {

        throw new Error("Cannot destroy the form. Try again.")
    
    }
}

module.exports = { formCreate, getForms, getForm, getPenddingForms, destroyForm }