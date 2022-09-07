const bcrypt = require('bcrypt');
const { Student, Rol, Player} = require('../../db');
// const { Student, Rol, Player} = require("C:/Users/gonza/Desktop/Managame/Managame/back/src/db.js");

async function createStudent(data) {

    const { id, name, password, email, rol } = data;

    try {

        const genSalt = await bcrypt.genSalt(5);
       
        const hash = bcrypt.hashSync(password, genSalt);

        const role = await Rol.findOne({ where: { name: rol }});

        const studentExist = await Student.findByPk(id)

        if (studentExist) return studentExist
        else {
        
        const student = await Student.create({
            id: id,
            name: name,
            email: email,
            password: hash    
        });  

        await role.addStudents(student);

        if (student.dataValues.id > 0) return ({message: `Student (id: ${id}, name: ${name}) generated`})

        }
    } 

    catch (e) {
        return `The following student can not be created ${id, "    ",name}`
    }

}

async function getStudentId(id) {
    
    try {
        const student = await Student.findByPk(id,{
            attributes: { exclude: ['password'] },
        });
        
        if (student) return (student);
        
    } catch (e) {
        throw new Error("Cannot find the student whit that id.")
    }
}

async function getStudents() {

    try {

        const students = await Student.findAll({
            attributes: { exclude: ['password'] }
        })

        if (students) return (students)
  
    } catch (e) {

        throw new Error("An error has ocurred, cannot find the students")
    
    }
}

async function updateStudent(id, {name, password, email, wallet}) {
    
    try {
        const student = await Student.findOne({ where: { id: id } });
        
        if (!student) return("No student found")

        if (password) {
            const genSalt = await bcrypt.genSalt(5);
            var hash = bcrypt.hashSync(password, genSalt);
        }

        const change = await Student.update(
                            {
                                name: name,
                                email: email,
                                password: hash,
                                wallet: wallet
                            },
                            {
                                where: { id: id }
                            }
        );
        
        if (change) return ("Update done")
   
    } catch (e) {

        throw new Error("Cannot change the student's data")
    
    }
}

async function deleteStudent(id) {

    try {
        
        const destroy = await Student.destroy({ where: { id: id } });
        
        if (destroy) return(destroy)
    } 
    catch (e) {

        throw new Error("No student found")

    }
}

async function walletDecrement({
    id,
    wallet
    }) 
    {

    try {

        var student = await Student.findByPk(id); 

        if(!student) return "No student found"
        if(student.wallet < wallet) {student.update({wallet: 0}); return "Wallet in 0"}

        var newWallet = await student.decrement({wallet: wallet})

        if (newWallet) return (newWallet)

    } catch (e) {

        console.log(e)
        throw new Error("An error has ocurred, cannot decrement the wallet")
    }

}

async function playerAdd({
    id,
    playerId
    }) 
    {

    try {

        const player = await Player.findByPk(playerId);

        const student = await Student.findByPk(id); 

        if(!student) return "No student found"
        if(!player) return "No player found"

        if (student.dataValues.playerId !== null) return "The student already have a player"

        const add = await player.addStudent(student);
        
        if (add) return (add)

    } catch (e) {

        console.log(e)
        throw new Error("An error has ocurred, cannot decrement the wallet")
    }

}

async function playerRemove({id}) 
    {

    try {

        const student = await Student.findByPk(id); 

        if(!student) return "No student found"

        const add = await student.setPlayer(null);
        
        if (add) return (add)

    } catch (e) {

        throw new Error("An error has ocurred, cannot remove the player")
    }

}

module.exports = { createStudent, getStudents, getStudentId, updateStudent, deleteStudent, walletDecrement, playerAdd, playerRemove};

