//INICIALIZAMOS LA VARIABLE MYSQL PARA TENER ACCESO A SUS METODOS
const mysql = require('mysql');
//DESTRUCTURAMOS LOS DATOS NECESARIOS PARA CONECTAR, ESTAN EN CONFIG.JS
const {user, password, host, database} = require('./config');

const connection = mysql.createConnection({
    host, // = host:host
    user,
    password,
    database
})


connection.connect((error)=>{
    if(error) throw error
    console.log('=============================')
    console.log('Conectado a la base de Datos!')
    console.log('=============================')
})

module.exports = connection