const conn = require('../database/database');
const bcryptjs = require('bcryptjs');

async function agregarmedico(){

    const correo = 'admin';
    const contrasena = '12345';
    let constrasenaHash = await bcryptjs.hash(contrasena, 1)

    conn.query('insert into admin set ?', {correo, contrasena:constrasenaHash}, (error, results) => {
        if (error) throw error
        console.log('ADMIN AGREGADO')
    })

}

//DENTRO DE LA CONSOLA CORRER node controllers/insertadmin SIN INICIAR NPM RUN WATCH
agregarmedico();