const express = require('express');
const router = express.Router();

const conn = require('../database/database')
const crud = require('../controllers/crud')

//INICIO SESION USUARIO
router.post('/login', crud.login)
//INICIO SESION MEDICO
router.post('/loginMed', crud.loginmedico)
//INICIO SESION ADMIN
router.post('/loginAdmin', crud.loginadministrador)
//LOGOUT
router.get('/logout', crud.logout)

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
router.get('/servicios', (req, res) => {
    conn.query('SELECT * FROM servicios', (error, servicios) => {
        if (error) throw error
        res.render("adminpantallas/servicios", { servicios });
    })
})

//MOSTRAR SERVICIOS servicio probando
router.get('/agregarmedico', (req, res) => {
    conn.query('SELECT id_servicio, servicio FROM servicios ORDER BY servicio ASC', (error, servicios) => {
        if (error) throw error
        res.render("adminpantallas/agregarmedico", { servicios });
    })
})

//AGREGAR SERVICIO
router.get('/agregarservicio', (req, res) => {
    res.render("adminpantallas/agregarservicio", {});
})

router.post('/guardar', crud.guardar)

//EDITAR SERVICIO
router.get('/editarservicio/:servicio', (req, res) => {
    const servicio = req.params.servicio;
    conn.query('select * from servicios where servicio=?', [servicio], (error, servicio) => {
        if (error) throw error
        res.render("adminpantallas/editarservicio", { servicio: servicio[0] });
    })
})

router.post('/editar', crud.editar)

//ELIMINAR SERVICIO, ETC
router.get('/eliminar/:servicio', (req, res) => {
    const servicio = req.params.servicio;
    conn.query('delete from servicios WHERE servicio = ?', [servicio], (error, results) => {
        if (error) throw error
        res.redirect('/servicios');
    })
})

/*---procesos bd admin/medico---*/
router.post('/agregarmedico', crud.agregarmedico)

//mostrar medicos
router.get('/medicos', (req, res) => {
    conn.query('SELECT * FROM medicos', (error, medicos) => {
        if (error) throw error
        res.render("adminpantallas/medicos", { medicos });
    })
})
//eliminar medico
router.get('/eliminarmedico/:id_medico', (req, res) => {
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
router.get('/agregarhorario', (req, res) => {
    res.render("adminpantallas/agregarhorario", {});
})

router.get('/busquedausuarios', (req, res) => {
    conn.query("select * from pacientes", (error, pacientes) => {
        if (error) throw error
        res.render("adminpantallas/busquedausuarios", { pacientes });
    });
})

router.get('/editarhorario', (req, res) => {
    res.render("adminpantallas/editarhorario", {});
})

router.get('/resutadodecita', (req, res) => {
    res.render("adminpantallas/resultadoCita", {});
})

router.get('/calendariocitas', (req, res) => {
    res.render("adminpantallas/calendariodecitas", {});
})

/*rutas medicos */
router.get('/medicos', (req, res) => {
    res.render("adminpantallas/medicos", {});
})
router.get('/agregarmedico', (req, res) => {
    res.render("adminpantallas/agregarmedico", {});
})
/*fin rutas medicos */

/*rutas admin/admins */
router.get('/admins', (req, res) => {
    res.render("adminpantallas/admins", {});
})

router.get('/agregaradmin', (req, res) => {
    res.render("adminpantallas/agregaradmin", {});
})
/*fin rutas admin/admins */



//RENDER USUARIO
router.get('/citasprogramadas', (req, res) => {
    res.render("usuariopantallas/citasUsuario", {});
})

router.get('/crearcita', (req, res) => {
    res.render("usuariopantallas/crearcita", {});
})

router.get('/editarcita', (req, res) => {
    res.render("usuariopantallas/editarcita", {});
})

router.get('/formulario', (req, res) => {
    res.render("usuariopantallas/formulario", {});
})

router.get('/historial', (req, res) => {
    res.render("usuariopantallas/historial", {});
})

router.get('/nosotros', (req, res) => {
    res.render("usuariopantallas/nosotros", {});
})

router.get('/preguntasfrecuentes', (req, res) => {
    res.render("usuariopantallas/preguntasfrecuentes", {});
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


module.exports = router;