const conn = require('../database/database');
const router = require('../Router/rutasmcs');
//DEFINIMOS BCRYPT
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {promisify}= require('util')
//LOGIN USUARIO

exports.login = async (req, res) => {

    const correo = req.body.correo;
    const contrasena = req.body.contrasena;

    if (correo && contrasena) {

        conn.query('select * from pacientes where correo = ?', [correo], async (error, result) => {

            if (result == 0 || !await bcryptjs.compare(contrasena, result[0].contrasena)) {

                res.render('usuariopantallas/iniciarsesion', {
                    alert: true,
                    alertTitle: 'Error de Inicio de Sesión',
                    alertMessage: 'Su usuario o contraseña son incorrectos',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'iniciarsesion'
                })

            } else {
                
                const id = result[0].id_paciente;
                
                const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                    expiresIn: process.env.JWT_TIEMPO_EXPIRA
                })
                

                const cookieOptions = {
                    expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRA * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions)
                res.redirect(`/perfilusuario`)
            }
        })
    }
}

exports.auth = async (req, res, next)=>{
    if(req.cookies.jwt){
        try {
            const decod = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conn.query('select * from pacientes where id_paciente = ?', [decod.id],(error, result)=>{
                if(!result){return next()}
                req.nombre = result[0]
                return next();
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/iniciarsesion')
    }
}

exports.logout = (req, res)=>{
    res.clearCookie('jwt')
    return res.redirect('/')
}

//SERVICIOS
//INSERT
exports.guardar = (req, res) => {
    const servicio = req.body.servicio;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;

    conn.query('insert into servicios set ?', { servicio, descripcion, precio }, (error, results) => {
        if (error) throw error
        res.redirect('/servicios');
    })
}

//agregar medico 
exports.agregarmedico = (req, res) => {

    const correo = req.body.correo;
    const contrasena = req.body.contrasena;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const cedula = req.body.cedula;
    const id_servicio = req.body.id_servicio;

    conn.query('insert into medicos set ?', { correo, contrasena, nombre, apellido, cedula, id_servicio }, (error, results) => {
        if (error) throw error
        res.redirect('/medicos');
    })

}
/*fin agregar medico */
/*agregar admin */
exports.agregaradmin = (req, res) => {
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;


    conn.query('insert into admin set ?', { correo, contrasena, nombre, apellido }, (error, results) => {
        if (error) throw error
        res.redirect('/admins');
    })

}
/*fin agregar admin */
/* ----- REGISTRO DE PACIENTES  ----------*/

exports.registrarpaciente = async (req, res) => {

    const correo = req.body.correo;

    const contrasena = req.body.contrasena;
    //CONTRASENA CON HASH
    let constrasenaHash = await bcryptjs.hash(contrasena, 1)

    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const cedula = req.body.cedula;
    const fechadenacimiento = req.body.fechadenacimiento;
    const sexo = req.body.sexo;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;

    conn.query('insert into pacientes set ?', {
        correo, contrasena: constrasenaHash, nombre, apellido,
        cedula, fechadenacimiento, sexo, telefono, direccion
    }, (error, results) => {

        if (error) throw error
        res.render('usuariopantallas/registrar', {
            alert: true,
            alertTitle: 'Registro Completo',
            alertMessage: 'Se ha registrado correctamente!',
            alertIcon: 'success',
            showConfirmButton: true,
            timer: false,
            ruta: ''
        });

    })

}

/* ----- FIN REGISTRO DE PACIENTES  ----------*/

//UPDATE
exports.editar = (req, res) => {

    const servicio = req.body.servicio;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;

    conn.query('UPDATE servicios set ? where servicio = ?', [{ servicio, descripcion, precio }, servicio], (error, results) => {

        if (error) throw error
        res.redirect('/servicios')

    })
}