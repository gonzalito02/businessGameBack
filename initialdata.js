const dataPlayer = [
    {   
        id: 1001,
        officialName: "EMPRESA A",
        group: "Presencial",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "genius3"
    },
    {   
        id: 1002,
        officialName: "EMPRESA B",
        group: "Presencial",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "asus1002"
    },
    {   
        id: 1003,
        officialName: "EMPRESA C",
        group: "Presencial",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "crack78"
    },
    {   
        id: 1004,
        officialName: "EMPRESA D",
        group: "Presencial",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "catol78"
    },
    {   
        id: 1005,
        officialName: "EMPRESA E",
        group: "Presencial",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "primicia9"
    },
    {   
        id: 1006,
        officialName: "EMPRESA F",
        group: "Presencial",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "hdmi65"
    },
    {   
        id: 1007,
        officialName: "EMPRESA G",
        group: "Distancia",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "messi10"
    },
    {   
        id: 1008,
        officialName: "EMPRESA H",
        group: "Distancia",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "salta445"
    },
    {   
        id: 1009,
        officialName: "EMPRESA I",
        group: "Distancia",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "catalogo34"
    },
    {   
        id: 1010,
        officialName: "EMPRESA J",
        group: "Distancia",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "sincro66"
    },
    {   
        id: 1011,
        officialName: "EMPRESA K",
        group: "Distancia",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "toten49"
    },
    {   
        id: 1012,
        officialName: "EMPRESA L",
        group: "Distancia",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "simon55"
    },
    {   
        id: 1013,
        officialName: "EMPRESA M",
        group: "Distancia",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "matetermo57"
    },
    {   
        id: 1111,
        officialName: "CONTROLER",
        group: "omnipresente",
        members: ["unique"],
        password: "theChosenOne"
    }
]

const roles = [
    {
        name: "admin",
        description: "administrador"
    },
    {
        name: "player",
        description: "Player"
    },
    {
        name: "student",
        description: "Estudiante"
    }
]

const students = [
    {
        id: 38506528,
        name: "Gonzalo Rumi",
        password: "Chaplin02",
        email: "rumigonzalo@gmail.com",
        rol: "admin"
    },
    {
        id: 11111111,
        name: "Admin Game",
        password: "adminbusy1",
        email: "gonza0211@gmail.com",
        rol: "admin"
    },
    {
        id: 12345678,
        name: "Random Student",
        password: "Manzana12",
        email: "gonza0211@gmail.com",
        rol: "student"
    },
    {
        id: 99999999,
        name: "Big Buyer",
        password: "algoritmo2",
        email: "gonza0211@gmail.com",
        rol: "student"
    },
    {id:38162920, name:"Daiana Alejandra Aleman",password:"40440", email:"daialeman20@gmail.com", rol:"student"},
    {id:40515874, name:"Rosario Alonso Crespo",password:"11118", email:"rosarioalonsocrespo@gmail.com", rol:"student"},
    {id:42018087, name:"Carlos Luciano Abdenur",password:"26609", email:"Soii.lucho@hotmail.com.ar", rol:"student"},
    {id:39360686, name:"David Ignacio Arevalo",password:"24802", email:"ignacioarevalo2810@gmail.com", rol:"student"},
    {id:30338874, name:"Maria Micaela De Las Mercedes Ayon",password:"72118", email:"micaela.ayon@outlook.com", rol:"student"},
    {id:42018075, name:"Juan Francisco Budonnet",password:"26525", email:"franciscobudonnet@hotmail.com", rol:"student"},
    {id:43137260, name:"Exequiel Nahuel Camacho González",password:"60820", email:"eseriver00@gmail.com", rol:"student"},
    {id:43548346, name:"Maria Agustina De Singlau Hamaski",password:"38422", email:"agusdesinglau@hotmail.com", rol:"student"},
    {id:42215868, name:"Bruno Patricio Del Campo",password:"11076", email:"brunodelcampo3@gmail.com", rol:"student"},
    {id:42897457, name:"Briseida Aylen Delgado",password:"82199", email:"Delgadobriseida575@gmail.com", rol:"student"},
    {id:42813232, name:"Milagros Diaz Espin",password:"92624", email:"milidiazespin@gmail.com", rol:"student"},
    {id:43373290, name:"Joaquin Diez Garrido",password:"13030", email:"paolagarrido00@yahoo.com.ar", rol:"student"},
    {id:43438607, name:"Agustina Garijo",password:"70249", email:"agusgarijo@gmail.com", rol:"student"},
    {id:38215056, name:"Constanza Lopez Medina Chacon Dorr",password:"05392", email:"colopezmchd@gmail.com", rol:"student"},
    {id:42520480, name:"Maria Valentina Sanz Navamuel",password:"43360", email:"valesanzn7@gmail.com", rol:"student"},
    {id:43374926, name:"Trinidad Suarez De La Llosa",password:"24482", email:"t.suarezdelallosa@gmail.com", rol:"student"},
    {id:42303480, name:"Bautista Jose Tedin Chavarria",password:"24360", email:"bauti-tedin@hotmail.com", rol:"student"},
    {id:742324562, name:"Claudia Gabriela Abasolo Arbañil",password:"71934", email:"Claudiaabasolo766@gmail.com", rol:"student"},
    {id:29754355, name:"Ruben Alfredo Alvarado",password:"80485", email:"rubenalfredoalvarado@gmail.com", rol:"student"},
    {id:39216120, name:"Rosa Micaela Argañaraz Lopez",password:"12840", email:"lopezmica2014@gmail.com", rol:"student"},
    {id:40176052, name:"Sofia Alejandra Artero",password:"32364", email:"sofia.artero.1498@gmail.com", rol:"student"},
    {id:771768167, name:"Melissa Consuelo Briones Sandoval",password:"77169", email:"77176616@usat.pe", rol:"student"},
    {id:41985972, name:"Gonzalo Carlino",password:"01804", email:"gonzalo@cimsa-salta.com.ar", rol:"student"},
    {id:726252934, name:"Carlos Alberto Chafloque Sanchez",password:"70538", email:"carlos_17_ccu@hotmail.com", rol:"student"},
    {id:36347446, name:"Nicolas Ignacio Chura Cruz",password:"32122", email:"nicolasignaciochura@gmail.com", rol:"student"},
    {id:41529568, name:"David Domingo Las Heras",password:"06976", email:"david99domingo@hotmail.com", rol:"student"},
    {id:36337854, name:"Jesus Humberto Dominguez",password:"64978", email:"jesus_di2_92@hotmail.com", rol:"student"},
    {id:39888588, name:"Jacinta María Larran",password:"20116", email:"jacintamarialarran@gmail.com", rol:"student"},
    {id:37600619, name:"Mauro Ricardo Lucema",password:"04333", email:"maurorlucema@gmail.com", rol:"student"},
    {id:41232828, name:"Leandro Nahuel Marin Lopez",password:"29796", email:"marinlnoficial@gmail.com", rol:"student"},
    {id:25069857, name:"Maria Eugenia Montoya Quiroga",password:"88999", email:"marumontoya@hotmail.com", rol:"student"},
    {id:41383811, name:"Rodrigo Quiroga",password:"86677", email:"rodriquiroga@icloud.com", rol:"student"},
    {id:31716491, name:"Victoria Raquel Rosas",password:"15437", email:"rosasvictoriar@gmail.com", rol:"student"},
    {id:32365775, name:"Laura Mariana Del Carmen Rubelt",password:"60425", email:"laurarubelt086@gmail.com", rol:"student"},
    {id:39895611, name:"Facundo Rusinek",password:"69277", email:"facurusinek@gmail.com", rol:"student"},
    {id:43168575, name:"Martina Troyano De La Cuesta",password:"80025", email:"martitroya01@gmail.com", rol:"student"},
    {id:32630273, name:"Jose Rodrigo Verasay",password:"11911", email:"verasayrodrigo@hotmail.com", rol:"student"},
    {id:36401647, name:"Aimar Maria Elina",password:"11529", email:"meaimar1991@gmail.com", rol:"student"},
    {id:42604972, name:"Alvarez Sofia Elisa",password:"34804", email:"sofialvarez2813@gmail.com", rol:"student"},
    {id:36912022, name:"Giannattasio Nasra Laila Graciela",password:"84154", email:"laila_152007@hotmail.com", rol:"student"},
    {id:32366127, name:"Gomez Maria Andrea",password:"62889", email:"andrea.guille.1986@gmail.com", rol:"student"},
    {id:39225531, name:"Piriz Silvia Alejandra",password:"78717", email:"alejandrapiriz4@gmail.com", rol:"student"},
    {id:32961713, name:"Rius Mariana Alejandra",password:"31991", email:"marrius_03@hotmail.com", rol:"student"}
    ]

module.exports = { dataPlayer, students, roles }