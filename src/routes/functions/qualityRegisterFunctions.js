const { QualityRegister } = require('../../db')

async function getQualityRegister () {

    try {

        const qualityReg = await QualityRegister.findAll()
        
        console.log(qualityReg)

        if (qualityReg) return qualityReg
        
        else return "No quality register found"

    } catch (e) {
        throw new Error("No quality register found")
    }

}

async function getQualityRegisterId (id, period) {

    try {
        if (period) {
            var qualityReg = await QualityRegister.findAll({
                where: {playerId: id, period: period}
            })
        } else {
            var qualityReg = await QualityRegister.findAll({
                where: {playerId: id}
            })
        }

        if (qualityReg) return qualityReg
        
        else return "No quality register found"

    } catch (e) {
        throw new Error(`No quality register found, playerID: ${id}`)
    }

}

async function deleteQualityRegister(id, {period}) {

    try {

        const destroy = await QualityRegister.destroy({ where: { id: id, period: period } });
        
        if (destroy) return(destroy)
    } 
    catch (e) {

        throw new Error("No quality register found")

    }

}



module.exports = { getQualityRegister, getQualityRegisterId, deleteQualityRegister }