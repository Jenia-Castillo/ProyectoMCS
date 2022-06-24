const express = require('express');
const router = express.Router();

const conn = require('../database/database')
const crud = require('../controllers/crud')

//RENDER INDEX
router.get('/', (req, res)=>{
    res.render("index", {});
})

//RENDER ADMINISTRADOR
router.get('/inicioadministrador', (req, res)=>{
    res.render("adminpantallas/adminPerfil", {});
})

/* ============ SERVICIOS CRUD ============= */

//MOSTRAR SERVICIOS
router.get('/servicios', (req, res) => {
    conn.query('SELECT * FROM servicios', (error, servicios)=>{
        if(error) throw error
        res.render("adminpantallas/servicios", {servicios});
    })
})

//AGREGAR SERVICIO
router.get('/agregarservicio', (req, res)=>{
    res.render("adminpantallas/agregarservicio", {});
})

router.post('/guardar', crud.guardar)

//EDITAR SERVICIO
router.get('/editarservicio/:servicio', (req, res) => {
    const servicio = req.params.servicio;
    conn.query('select * from servicios where servicio=?', [servicio], (error, servicio)=>{
        if(error) throw error
        res.render("adminpantallas/editarservicio", {servicio:servicio[0]});
    })
})

router.post('/editar', crud.editar)

//ELIMINAR SERVICIO, ETC
router.get('/eliminar/:servicio', (req, res)=>{
    const servicio = req.params.servicio;
    conn.query('delete from servicios WHERE servicio = ?', [servicio], (error, results)=>{
        if(error)throw error
        res.redirect('/servicios');
    })
})

/* ============= SERVICIOS CRUD FINAL ============= */

router.get('/agregarhorario', (req, res)=>{
    res.render("adminpantallas/agregarhorario", {});
})

router.get('/busquedausuarios', (req, res)=>{
    res.render("adminpantallas/busquedausuarios", {});
})

router.get('/editarhorario', (req, res)=>{
    res.render("adminpantallas/editarhorario", {});
})

router.get('/resutadodecita', (req, res)=>{
    res.render("adminpantallas/resultadoCita", {});
})

router.get('/calendariocitas', (req, res)=>{
    res.render("adminpantallas/calendariodecitas", {});
})

//RENDER USUARIO
router.get('/citasprogramadas', (req, res)=>{
    res.render("usuariopantallas/citasUsuario", {});
})

router.get('/crearcita', (req, res)=>{
    res.render("usuariopantallas/crearcita", {});
})

router.get('/editarcita', (req, res)=>{
    res.render("usuariopantallas/editarcita", {});
})

router.get('/formulario', (req, res)=>{
    res.render("usuariopantallas/formulario", {});
})

router.get('/historial', (req, res)=>{
    res.render("usuariopantallas/historial", {});
})

router.get('/nosotros', (req, res)=>{
    res.render("usuariopantallas/nosotros", {});
})

router.get('/preguntasfrecuentes', (req, res)=>{
    res.render("usuariopantallas/preguntasfrecuentes", {});
})

router.get('/perfilusuario', (req, res)=>{
    res.render("usuariopantallas/usuarioPerfil", {});
})
module.exports = router;