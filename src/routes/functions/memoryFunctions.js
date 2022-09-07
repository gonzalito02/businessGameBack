const { Memory } = require('../../db');

async function createMemory(data) {

    const { author, text } = data;

    try {

        const memory = await Memory.create({
            author: author,
            text: text
        })
        
        if (memory) return memory 

    } catch (e) {
        console.log(e)
        throw new Error("Cannot create the memory. Try again.")
    }
};

async function getMemories() {

    try {

        const memories = await Memory.findAll({})

        if (memories) return memories 

    } catch (error) {

        throw new Error("Cannot get the memories. Try again.")
    
    }
}

async function destroyMemory(id) {

    try {

        const memories = await Memory.destroy({
            where: {
                id: id
            }
        })

        if (memories) return memories 

    } catch (error) {

        throw new Error("Cannot destroy the memory. Try again.")
    
    }
}

module.exports = { createMemory, getMemories, destroyMemory};