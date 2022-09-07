const { Player, Rol, DinamicForm, ActionData, QualityRegister, ResultsData, Student } = require('../../db')
const bcrypt = require("bcrypt");

async function playerCreate ({id, officialName, group, members, password}) {

    try {

    const genSalt = await bcrypt.genSalt(5);
    
    const hash = bcrypt.hashSync(password, genSalt);

    const playerExist = await Player.findByPk(id)

    if (playerExist) return playerExist
    else {

    const newPlayer = await Player.create({
        id: id,
        officialName: officialName,
        group: group,
        members: members,
        password: hash
    })

    if (newPlayer) {var role = await Rol.findOne({ where: { name: "player" }})}

    if (role) {await role.addPlayer(newPlayer)};

    if (newPlayer) return newPlayer
    
    }

    } catch (e) {
        throw new Error("Cannot create the player, maybe conflict whit the id. Try again.")
    }

}

async function getPlayers () {

    try {

    const players = await Player.findAll({
            include: [{model: ResultsData}]
    })

    if (players) return players

    } catch (e) {
        throw new Error("No players found")
    }

}

async function getPlayer (id) {

    try {

    const player = await Player.findByPk(id, {
                include: [{model: DinamicForm}, {model: ActionData}, {model: QualityRegister}, {model: Student}]
    })

    if (player) return player

    } catch (e) {
        throw new Error(`No player found with the playerId: ${id}`)
    }

}

async function updatePlayer (id, {officialName, fantasyName, group, members, password, resultAcc, index, initialCapital}) {

    try {

    //const player = await Player.findByPk(id)

        if (officialName) {
            await Player.update(
            {
                officialName: officialName,
            },
            {
                where: { id: id },
            }
            );
        }
        if (fantasyName) {
            await Player.update(
            {
                fantasyName: fantasyName,
            },
            {
                where: { id: id },
            }
            );
        }
        if (group) {
            await Player.update(
            {
                group: group,
            },
            {
                where: { id: id },
            }
            );
        }
        if (members) {
            await Player.update(
            {
                members: members,
            },
            {
                where: { id: id },
            }
            );
        }
        if (password) {
            await Player.update(
            {
                password: password,
            },
            {
                where: { id: id },
            }
            );
        }
        if (resultAcc) {
            await Player.update(
            {
                resultAcc: resultAcc,
            },
            {
                where: { id: id },
            }
            );
        }
        if (index) {
            await Player.update(
            {
                index: index,
            },
            {
                where: { id: id },
            }
            );
        }
        if (initialCapital) {
            await Player.update(
            {
                initialCapital: initialCapital,
            },
            {
                where: { id: id },
            }
            );
        }

    return {message: "Updated", id: id}

    } catch (e) {
        throw new Error(`Cannot update the player with the playerId: ${id}`)
    }

}

async function disallowToPlay (id) {

    try {

        await Player.update(
        {
            allowToPlay: false,
        },
        {
            where: { id: id },
        }
        );
    

    return {message: "Disallowed to play", id: id}

    } catch (e) {
        throw new Error(`Cannot update the player with the playerId: ${id}`)
    }

}

async function allowToPlayFunc (id) {

    try {

        const player = await Player.findByPk(id)

        const current = player.dataValues.allowToPlay

        await Player.update(
        {
            allowToPlay: !current,
        },
        {
            where: { id: id },
        }
        );
    

    return {message: "Change status allowToPlay done", id: id}

    } catch (e) {
        throw new Error(`Cannot update the player with the playerId: ${id}`)
    }

}

module.exports = { playerCreate, getPlayers, getPlayer, updatePlayer, disallowToPlay, allowToPlayFunc}