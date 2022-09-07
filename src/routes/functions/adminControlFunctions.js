const { GameControl, ActionData, DinamicForm, Student } = require('../../db')

// costo de un punto de calidad.
// tasa maxima de rendimiento de una inversión financiera.
// costo de produccion de los productos
// tasa minima de costo de un prestamo
// montos maximos de inversión y mínimo de producción.

async function gameControlCreate (variables) {

    try {

    const gameControl = await GameControl.create({
        variables: variables
    })

    if (gameControl) return gameControl

    } catch (e) {
        throw new Error("Cannot create the gameControl. Try again.")
    }

}

async function getGameControl () {

    try {

    const gameControls = await GameControl.findAll({})

    if (gameControls) return gameControls

    } catch (e) {
        throw new Error("No forms found")
    }

}

async function updateGameControl (variables) {

    try {

        await GameControl.destroy({where: {}})

        const gameControl = await GameControl.create(
        {
            variables: variables,
        }
        );
        
        return gameControl
    } catch (e) {
        throw new Error("No gameControl found")
    }

}

async function validateActionForms ({playerId, period, validate, type}) {
    try {

        const form = await ActionData.update(
            {
                validateByAdmin: validate
            },
            {
                where: {
                    playerId: playerId,
                    period: period
                }
            }
            );
        
        return form

    } catch (e) {
        throw new Error("Cannot validate the indicated form")
    }
}

async function validateDinamicForms ({playerId, period, validate, type, loanInterest, clearingPeriod}) {
    
    try {

        const form = await DinamicForm.update(
            {
                validateByAdmin: validate,
                status: true
            },
            {
                where: {
                    playerId: playerId,
                    period: period,
                    type: type,
                }
            }
            );

        return form

    } catch (e) {
        throw new Error("Cannot validate the indicated form")
    }
}

async function deleteForm ({playerId, period}) {

    try {

    const form = await ActionData.destroy({
        where: {
            playerId: playerId,
            period: period
        }
    })

    console.log("soy el delete", form)

    return form

    } catch (e) {
        throw new Error("No form found to delete")
    }

}

// incluye formularios 
async function getAdminForms ({type, period}) {

    try {

    if (!type && !period) {

        const forms = await ActionData.findAll({})
        const dinamicforms = await DinamicForm.findAll({})
        if (forms || dinamicforms) return forms.concat(dinamicforms)

    } 
    
    if (type && !period) {

        const forms = await ActionData.findAll({ where: {validateByAdmin: type}})
        const dinamicforms = await DinamicForm.findAll({ where: {validateByAdmin: type}})
        if (forms || dinamicforms) return forms.concat(dinamicforms)

    }

    if (!type && period) {

        const forms = await ActionData.findAll({ where: {period: period}})
        const dinamicforms = await DinamicForm.findAll({ where: {period: period}})
        if (forms || dinamicforms) return forms.concat(dinamicforms)

    }

    if (type && period) {

        const forms = await ActionData.findAll({ where: {period: period, validateByAdmin: type}})
        const dinamicforms = await DinamicForm.findAll({ where: {period: period, validateByAdmin: type}})
        if (forms || dinamicforms) return forms.concat(dinamicforms)

    }

    else {
        return "nothing found"
    }

    } catch (e) {
        throw new Error("An error has ocurred, no forms found")
    }

}
//esta funcion se usa abajo, en walletSet
async function updateWallet(id, value) {

    try {
        await Student.update(
            {
                wallet: value
            },
            {
                where: {
                    id: id
                }
            }
         )
     } 
     catch (e) {
         console.log(e)
     }

}


async function walletSet({value}) {

    try {

        const wallets = await Student.findAll()

        wallets.forEach(w => {
            updateWallet(w.id, value)
        })

        return `Set wallets whit $ ${value}`
        
    } catch (e) {
        throw new Error("Cannot set the wallets")
    }
}

module.exports = { gameControlCreate, getGameControl, updateGameControl, 
    validateActionForms, deleteForm, getAdminForms, validateDinamicForms,
    walletSet, updateWallet }