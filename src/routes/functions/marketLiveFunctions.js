const { MarketLive, Player } = require('../../db')

async function getMarketLive () {

    try {

    const market = await MarketLive.findAll()

    if (market) return market
    else return "No market found"

    } catch (e) {
        throw new Error("An error has ocurred, no market found")
    }

}

async function getMarketLiveForDownload () {

    try {

    const market = await MarketLive.findAll({
        attributes: {
            exclude: ["qualityProduct", "id"]
        }
    })

    if (market) return market
    else return "No market found"

    } catch (e) {
        throw new Error("An error has ocurred, no market found")
    }

}

async function marketOfferInsert (playerID, {
        period,
        typeProduct,
        stockProduct,
        qualityProduct,
        priceProduct
        }) 

        {
            
        try {

        const player = await Player.findOne({ where: { id: playerID } });

        if (!player) return "No player found"
        // console.log(player.dataValues.officialName)

        const marketInsert = await MarketLive.create({
            period: period,  
            officialName: player.dataValues.officialName,
            fantasyName: player.dataValues.fantasyName,
            typeProduct: typeProduct, 
            stockProduct: stockProduct,
            qualityProduct: qualityProduct,
            priceProduct: priceProduct
        })
    
        await player.addMarketLive(marketInsert);
    
        if (marketInsert) return (marketInsert)
    
        } catch (e) {
            throw new Error("An error has ocurred, cannot create a market offer")
        }
}

async function marketOfferDecrement ({
    playerId,
    period,
    typeProduct,
    stockProduct
    }) 
    {

    try {

    const marketObject = await MarketLive.findOne({ where: { playerId: playerId, period: period, typeProduct: typeProduct } }); 

            if (marketObject?.dataValues.stockProduct === 0) {
                return "no stock"
            }

             try {

                if (marketObject?.dataValues.stockProduct < stockProduct) {
                    const newMarketObject = await marketObject.update({stockProduct: 0})
                    return newMarketObject
                }

                const newMarketObject = await marketObject.decrement({stockProduct: stockProduct})

                if (newMarketObject) return (newMarketObject)

            }   catch (e) {

                return ("No product found")
            
            }

    } catch (e) {

        console.log(e)
        throw new Error("An error has ocurred, cannot found the product")
    }

}

async function destroyMarketLive () {

    try {

    const market = await MarketLive.destroy({
        where:{}
    })

    if (market) return market
    else return "No market found"

    } catch (e) {
        throw new Error("An error has ocurred, no market found")
    }

}

async function updatePlayerMarket ({playerId, typeProduct, qualityProduct, stockProduct}) {

    try {
        
        var marketPlayer = await MarketLive.findOne({ where: { playerId: playerId, typeProduct: typeProduct }}); 

        if (marketPlayer) {

            if(qualityProduct) await marketPlayer.increment("qualityProduct", {by: qualityProduct})
            if(stockProduct) await marketPlayer.increment("stockProduct", {by: stockProduct})

        }

        if (marketPlayer) return marketPlayer

    } catch (e) {

        throw new Error(`Cannot update the marketLive`)

    }
}

module.exports = { getMarketLive, marketOfferInsert, marketOfferDecrement, destroyMarketLive, getMarketLiveForDownload, updatePlayerMarket}