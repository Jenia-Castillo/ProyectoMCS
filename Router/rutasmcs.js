

const express = require('express');
const router = express.Router();

const conn = require('../database/database')
const crud = require('../controllers/crud')
const {promisify}= require('util');
const jwt = require('jsonwebtoken');
const pay = require('../controllers/payment.controller')

//INICIO SESION USUARIO
router.post('/login', crud.login)
//INICIO SESION MEDICO
router.post('/loginMed', crud.loginmedico)
//INICIO SESION ADMIN
router.post('/loginAdmin', crud.loginadministrador)
//LOGOUT
router.get('/logout', crud.logout)
//AGREGAR HORARIO
router.post('/agregarhora',crud.agregarhorario)

//EDITAR HORARIOS
router.post('/editarhora',crud.editarhora)

router.get('/editarhorario/:id_horario', crud.authadmin,(req, res) => {
    const id_horario = req.params.id_horario;
    conn.query('select * from horarios where id_horario=?', [id_horario], (error, horario) => {
        if (error) throw error
        res.render("adminpantallas/editarhorario", { horario: horario[0] });
    })
})

//EDITAR PACIENTE
router.post('/editarpaciente',crud.editarpaciente)

router.get('/editarpaciente/:id_paciente', crud.authadmin,(req, res) => {
    const id_paciente = req.params.id_paciente;
    conn.query('select * from pacientes where id_paciente=?', [id_paciente], (error, paciente) => {
        if (error) throw error
        res.render("adminpantallas/editarpaciente", { paciente: paciente[0]});
    })
})
//Perfil paciente

router.get('/perfilpaciente/:id_paciente', crud.authadmin,(req, res) => {
    const id_paciente = req.params.id_paciente;
    conn.query('select * from pacientes where id_paciente=?', [id_paciente], (error, paciente) => {
        if (error) throw error
        res.render("adminpantallas/perfilPaciente", { paciente: paciente[0]});
    })
})

// ELIMINAR HORARIO
router.get('/eliminarhorario/:id_horario', crud.authadmin,(req, res) => {
    const id_horario = req.params.id_horario;
    conn.query('delete from horarios WHERE id_horario = ?', [id_horario], (error, results) => {
        if (error) throw error
        res.redirect('/horarios');
    })
})
//LOGIN MEDICO
router.get('/iniciarsesionmed',(req, res) => {
    res.render("adminpantallas/iniciosesionMedico", {});
})

//LOGIN ADMIN
router.get('/iniciarsesionadmin', (req, res) => {
    res.render("adminpantallas/iniciosesionadmin", {});
})

//RENDER INDEX
router.get('/', (req, res) => {
    res.render("index", {});
})

//RENDER DOCTOR PERFIL
router.get('/iniciodoctor', crud.authmedico, (req, res) => {
    res.render("adminpantallas/perfilDoctor", {medico:req.medico});
})

//RENDER ADMINISTRADOR
router.get('/inicioadministrador', crud.authadmin, (req, res) => {
    res.render("adminpantallas/adminPerfil", {admin:req.admin});
})

/* ============ SERVICIOS CRUD ============= */

//MOSTRAR SERVICIOS
router.get('/servicios', crud.authadmin,(req, res) => {
    conn.query('SELECT * FROM servicios', (error, servicios) => {
        if (error) throw error
        res.render("adminpantallas/servicios", { servicios });
    })
})

//MOSTRAR CITAS //CAMBIAR ESTOOOOOOOOOOOOOOOOOOOOOOOOOOOOO CUANDO SEPA COMO FUNCA LOGIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIN
router.get('/citasprogramadas', async (req, res) => {
    const decod = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
    conn.query('SELECT citas.id_cita as id_cita, citas.costo as costo, citas.hora as hora, citas.fecha as fecha, citas.estado as estado, servicios.servicio as id_servicio FROM citas JOIN servicios on citas.id_servicio = servicios.id_servicio where id_paciente = ?', [decod.id], (error, citas) => {
        if (error) throw error
        const moment = require('moment');
        res.render("usuariopantallas/citasUsuario", { citas, moment });
    })
})

//MOSTRAR SERVICIOS servicio probando
router.get('/crearcita',(req, res) => {
    conn.query('SELECT * FROM servicios', (error, servicios) => {
        if (error) throw error
        res.render("usuariopantallas/crearcita", { servicios});
    })
})
//Select dinamico en crearCita
/*router.get('/getselectCita',(req, res, next) => {
    console.log("hola");
    var type = req.query.type;
    var search_query = req.query.parent_value;
    console.log("hola");

    if(type == 'load_doctor'){
        var query = `select * FROM medicos where id_servicio ='${search_query}' ORDER BY medicos ASC`
    }
    conn.query(query,function(err,data){
        var data_arr=[];
        data.foreach(function(row){
            data_arr.push(row.Data);
        });
        res.json(data_arr);
    });
})*/

//MOSTRAR SERVICIOS servicio probando
router.get('/agregarmedico', crud.authadmin,(req, res) => {
    conn.query('SELECT id_servicio, servicio FROM servicios ORDER BY servicio ASC', (error, servicios) => {
        if (error) throw error
        res.render("adminpantallas/agregarmedico", { servicios });
    })
})

//AGREGAR SERVICIO
router.get('/agregarservicio', crud.authadmin,(req, res) => {
    res.render("adminpantallas/agregarservicio", {});
})

//AGREGAR PREGUNTAS FRECUENTES
router.get('/agregarpreguntas', crud.authadmin,(req, res) => {
      res.render("adminpantallas/agregarpreguntas", {});
})
//AGREGAR PREGUNTA
router.post('/guardarpregunta',crud.guardarpregunta)

//GUARDAR SERVICIO
router.post('/guardar', crud.guardar)

//EDITAR SERVICIO
router.get('/editarservicio/:servicio', crud.authadmin,(req, res) => {
    const servicio = req.params.servicio;
    conn.query('select * from servicios where servicio=?', [servicio], (error, servicio) => {
        if (error) throw error
        res.render("adminpantallas/editarservicio", { servicio: servicio[0] });
    })
})

router.post('/editar', crud.editar)

//ELIMINAR SERVICIO, ETC
router.get('/eliminar/:servicio', crud.authadmin,(req, res) => {
    const servicio = req.params.servicio;
    conn.query('delete from servicios WHERE servicio = ?', [servicio], (error, results) => {
        if (error) throw error
        res.redirect('/servicios');
    })
})

//ELIMINAR Cita, ETC
router.get('/eliminarCita/:seleccionada', (req, res) => {
    const cita = req.params.seleccionada;
    conn.query('delete from citas WHERE id_cita = ?', [cita], (error, results) => {
        if (error) throw error
        res.redirect('/citasprogramadas');
    })
})

/*---procesos bd admin/medico---*/
router.post('/agregarmedico', crud.agregarmedico)

//mostrar medicos
router.get('/medicos', crud.authadmin,(req, res) => {
    conn.query('SELECT * FROM medicos', (error, medicos) => {
        if (error) throw error
        res.render("adminpantallas/medicos", { medicos });
    })
})
//eliminar medico
router.get('/eliminarmedico/:id_medico', crud.authadmin,(req, res) => {
    const id_medico = req.params.id_medico;
    conn.query('DELETE FROM medicos WHERE id_medico=?', [id_medico], (error) => {
        if (error) throw error
        res.redirect('/medicos');
    })
})

/*---fin procesos bd admin/medico---*/



/*proceso bd admin/admins
//agregar admin
router.post('/agregaradmin', crud.agregaradmin)
//mostrar admins
router.get('/admins', (req, res) => {
    conn.query('SELECT * FROM admin', (error, admin) => {
        if (error) throw error
        res.render("adminpantallas/admins", { admin });
    })
})

//eliminar admin
router.get('/eliminaradmin/:id_admin', (req, res) => {
    const id_admin = req.params.id_admin;
    conn.query('DELETE FROM admin WHERE id_admin=?', [id_admin], (error) => {
        if (error) throw error
        res.redirect('/admins');
    })
})
fin proceso bd admin/admins */


/*procesos bd para paciente*/
router.post('/registrarpaciente', crud.registrarpaciente)
/*fin procesos bd paciente */
/* ============= SERVICIOS CRUD FINAL ============= */
//RENDER ADMIN
router.get('/agregarhorario', crud.authadmin,(req, res) => {
    res.render("adminpantallas/agregarhorario", {});
})
//eliminar paceinte
router.get('/eliminarpaciente/:id_paciente', crud.authadmin,(req, res) => {
    const id_paciente = req.params.id_paciente;
    conn.query('DELETE FROM pacientes WHERE id_paciente=?', [id_paciente], (error) => {
        if (error) throw error
        res.redirect('/pacientes');
    })
})

//mostrar pacientes
router.get('/pacientes', crud.authadmin,(req, res) => {
    conn.query("select * from pacientes", (error, pacientes) => {
        if (error) throw error
        res.render("adminpantallas/pacientes", { pacientes });
    });
})

router.get('/editarhorario', crud.authadmin,(req, res) => {
    res.render("adminpantallas/editarhorario", {});
})

router.get('/resutadodecita', (req, res) => {
    res.render("adminpantallas/resultadoCita", {});
})

router.get('/horarios', crud.authadmin,(req, res) => {
    conn.query('SELECT * FROM horarios',(error,horarios)=>{
        if (error) throw error
        res.render("adminpantallas/horarios", {horarios});

    })
})

/*rutas medicos */
router.get('/medicos', (req, res) => {
    res.render("adminpantallas/medicos", {});
})
router.get('/agregarmedico', (req, res) => {
    res.render("adminpantallas/agregarmedico", {});
})
/*fin rutas medicos */

/*rutas admin/admins
router.get('/admins', (req, res) => {
    res.render("adminpantallas/admins", {});
})

router.get('/agregaradmin', (req, res) => {
    res.render("adminpantallas/agregaradmin", {});
})
fin rutas admin/admins */

//RENDER USUARIO
router.get('/citasprogramadas', crud.auth,(req, res) => {
    res.render("usuariopantallas/citasUsuario", {});
})

router.get('/crearcita', crud.auth,(req, res) => {
    res.render("usuariopantallas/crearcita", {});
})

//EDITAR CITA
router.get('/editarcita/:seleccionada', (req, res) => {
    const citas = req.params.seleccionada;
    conn.query('select * from citas where id_cita=?', [citas], (error, citas) => {
        if (error) throw error
        res.render("usuariopantallas/editarcita", { citas: citas[0] });
    })
})


router.get('/formulario', (req, res) => {
    res.render("usuariopantallas/formulario", {});
})

router.get('/historial', crud.auth,(req, res) => {
    res.render("usuariopantallas/historial", {});
})

router.get('/nosotros', (req, res) => {
    res.render("usuariopantallas/nosotros", {});
})

router.get('/preguntasfrecuentes', (req, res) => {
    conn.query('SELECT * FROM preguntasfrecuentes', (error, pregunta) => {
        if (error) throw error
        res.render("usuariopantallas/preguntasfrecuentes", { pregunta });
    })
})

router.get('/perfilusuario', crud.auth, (req, res) => {

    res.render('usuariopantallas/usuarioperfil', {paciente:req.paciente})
})

router.get('/iniciarsesion', (req, res) => {
    res.render('usuariopantallas/iniciarsesion', {})
})

router.get('/registrar', (req, res) => {
    res.render("usuariopantallas/registrar", {});
})

//GUARDAR Cita
/*router.get('/guardarCita', (req, res) => {
    res.render("usuariopantallas/crearcita", {});
})*/

router.post('/guardarCita', crud.guardarCita)
//router.post('/guardarCita', crud.guardarCita)

//Cosas de Paypal
//Ir ventana de pago
router.get('/crearorden/:costo', pay.crearOrden)

//Pago
router.get('/capturaorden', pay.capturaOrden)

//Cancelo o paso algo que no se hizo el pago
router.get('/cancelaorden', pay.cancelaOrden)

module.exports = router;