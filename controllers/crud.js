const conn = require('../database/database');
const router = require('../Router/rutasmcs');
//DEFINIMOS BCRYPT
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {promisify}= require('util')

//LOGIN MEDICO
exports.loginmedico = async (req, res) => {

    const correo = req.body.correo;
    const contrasena = req.body.contrasena;

    if (correo && contrasena) {

        conn.query('select * from medicos where correo = ?', [correo], async (error, result) => {

            if (result == 0 || !await bcryptjs.compare(contrasena, result[0].contrasena)) {

                res.render('adminpantallas/iniciosesionMedico', {
                    alert: true,
                    alertTitle: 'Error de Inicio de Sesión',
                    alertMessage: 'Su usuario o contraseña son incorrectos',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'iniciarsesionmed'
                })

            } else {
                
                const id = result[0].id_medico;
                
                const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                    expiresIn: process.env.JWT_TIEMPO_EXPIRA
                })
                

                const cookieOptions = {
                    expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRA * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions)
                res.redirect(`/iniciodoctor`)
            }
        })
    }
}

exports.authmedico = async (req, res, next)=>{
    if(req.cookies.jwt){
        try {
            const decod = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conn.query('select * from medicos where id_medico = ?', [decod.id],(error, result)=>{
                if(!result){return next()}
                req.medico = result[0]
                return next();
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/iniciarsesionmed')
    }
}

//FIN LOGIN MEDICO

//LOGIN ADMINISTRADOR
exports.loginadministrador = async (req, res) => {

    const correo = req.body.correo;
    const contrasena = req.body.contrasena;

    if (correo && contrasena) {

        conn.query('select * from admin where correo = ?', [correo], async (error, result) => {

            if (result == 0 || !await bcryptjs.compare(contrasena, result[0].contrasena)) {

                res.render('adminpantallas/iniciosesionadmin', {
                    alert: true,
                    alertTitle: 'Error de Inicio de Sesión',
                    alertMessage: 'Su usuario o contraseña son incorrectos',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'iniciarsesionadmin'
                })

            } else {
                
                const id = result[0].id_admin;
                
                const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                    expiresIn: process.env.JWT_TIEMPO_EXPIRA
                })
                

                const cookieOptions = {
                    expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRA * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions)
                res.redirect(`/inicioadministrador`)
            }
        })
    }
}

exports.authadmin = async (req, res, next)=>{
    if(req.cookies.jwt){
        try {
            const decod = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conn.query('select * from admin where id_admin = ?', [decod.id],(error, result)=>{
                if(!result){return next()}
                req.admin = result[0]
                return next();
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/iniciarsesionadmin')
    }
}


//FIN LOGIN ADMINISTRADOR

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
                req.paciente = result[0]
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

//LOGOUT
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

//Guardar pregunta
exports.guardarpregunta = (req, res) => {
    const pregunta = req.body.pregunta;
    const respuesta = req.body.respuesta;

    conn.query('insert into preguntasfrecuentes set ?', { pregunta, respuesta }, (error, results) => {
        if (error) throw error
        res.redirect('/inicioadministrador');
    })
}
//agregar medico 
exports.agregarmedico = async(req, res) => {

    const correo = req.body.correo;
    const contrasena = req.body.contrasena;
    let constrasenaHash = await bcryptjs.hash(contrasena, 1)
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const cedula = req.body.cedula;
    const id_servicio = req.body.id_servicio;

    conn.query('insert into medicos set ?', { correo, contrasena:constrasenaHash, nombre, apellido, cedula, id_servicio }, (error, results) => {
        if (error) throw error
        res.redirect('/medicos')
    })

}

/*fin agregar medico */
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

/*---INICIO REGISTRO DE HORARIO----*/
exports.agregarhorario= (req,res)=> {
    const hora = req.body.hora;
    conn.query('insert into horarios set ?',{hora},(error,result)=>{
    if (error) throw error
    res.redirect('/horarios')
    }) 
}

exports.editarhora = (req, res) => {

    const hora = req.body.hora;
    const id_horario= req.body.id_horario

    conn.query('UPDATE horarios set ? where id_horario = ?', [{ hora  }, id_horario], (error, results) => {

        if (error) throw error
        res.redirect('/horarios')

    })

}
/*---FIN REGISTRO DE HORARIO----*/


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