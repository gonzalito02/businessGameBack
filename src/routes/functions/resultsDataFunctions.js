const { ResultsData, Player} = require('../../db')

async function resultsDataCreate (playerId,
    {
        period, 
        taxesRate,
        qualityInvestment,
        productionInvestment,
        finantialInvestment,
        finantialFixedInvestment,
        loanInterest
    }
    )   

    {

        console.log("el taxes", taxesRate)
    const dataControl = playerId.toString() + period.toString() + "ResultsData"

    try {

    const player = await Player.findOne({ where: { id: playerId } });

    var searchResultsData = await ResultsData.findOne({
            where: { idControl: dataControl } 
    })

    if (searchResultsData) {

        if(loanInterest) await searchResultsData.update({loanInterest: loanInterest})
        if(finantialFixedInvestment) await searchResultsData.update({finantialInvestmentResults: finantialFixedInvestment})
        if(qualityInvestment) await searchResultsData.update({qualityInvestment: qualityInvestment})
        if(finantialInvestment) await searchResultsData.update({finantialInvestment: finantialInvestment})
        if(productionInvestment) await searchResultsData.update({productionInvestment: productionInvestment})
        if(taxesRate) await searchResultsData.update({taxesRate: taxesRate})
            
    } else {

        var resultsData = await ResultsData.create({
            period: period,  
            taxesRate: taxesRate,
            totalSales: 0,
            finantialInvestmentResults: finantialFixedInvestment || 0,
            qualityInvestment: qualityInvestment || 0,
            finantialInvestment: finantialInvestment || 0,
            productionInvestment: productionInvestment || 0,
            loanInterest: loanInterest || 0,
            extraResults: 0,
            observations: "",
            idControl: dataControl
        })
        await player.addResultsData(resultsData);
    }

    if (resultsData) return (resultsData)
    else return searchResultsData

    } catch (e) {
        console.log(e)
        throw new Error("An error has ocurred, cannot create the resultsData or update it")
    }
}

async function getResultsData () {

    try {

    const resultsData = await ResultsData.findAll()

    if (resultsData[0].dataValues.playerId > 0) return resultsData
    else return "No resultsData found"

    } catch (e) {
        throw new Error("An error has ocurred, no resultsData found")
    }

}

async function getResultsDataById(id) {

    try {

        const resultsData = await ResultsData.findAll({ where: {playerId: id}})
        
        if (resultsData) return resultsData
        else return "No resultsData found"

    } catch (e) {
        throw new Error(`No resultsData found, playerID: ${id}`)
    }

}

async function updateResultsData (playerId, {
    period,
    taxesRate,
    totalSales,
    finantialInvestmentResults,
    loanInterest,
    extraResults,
    observations
    }) 
    {
    
    try {

        var resultsData = []

        var searchResultsData = await ResultsData.findOne({ where: { playerId: playerId, period: period }}); 

        if (searchResultsData) {
            var resultsData = searchResultsData
            if(loanInterest) await resultsData.increment("loanInterest", {by: loanInterest})
        } else {
            var resultsData = await resultsDataCreate(playerId, {taxesRate, loanInterest, period})
        }
        
        if(extraResults) await resultsData.increment("extraResults", {by: extraResults})
        if(totalSales) await resultsData.increment("totalSales", {by: totalSales})
        if(finantialInvestmentResults) await resultsData.increment("finantialInvestmentResults", {by: finantialInvestmentResults})
        if(observations) await resultsData.update({observations: observations})
        if(taxesRate) await resultsData.update({taxesRate: taxesRate})

        const newResultsData = await ResultsData.findOne({ where: { playerId: playerId, period: period }}); 

        if (newResultsData) return (newResultsData)
            
    } catch (e) {

        console.log(e)
        throw new Error("An error has ocurred, cannot update the resultsData")
    }
}

async function updateBulkResultsData (data) {

    var log = []

    data.forEach(d => {
        let {period, playerId, stockProduct, priceProduct } = d.purchase
        const totalSales = stockProduct * priceProduct
        var load = updateResultsData(playerId, {period, totalSales})
        log.push(load)
    })

    return log
}

module.exports = { resultsDataCreate, getResultsData, getResultsDataById, updateResultsData, updateBulkResultsData }