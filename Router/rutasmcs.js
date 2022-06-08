const express = require('express');
const router = express.Router();

//RENDER INDEX
router.get('/', (req, res)=>{
    res.render("index", {});
})

//RENDER ADMINISTRADOR
router.get('/inicioadministrador', (req, res)=>{
    res.render("adminpantallas/adminPerfil", {});
})

router.get('/agregarservicio', (req, res)=>{
    res.render("adminpantallas/agregarservicio", {});
})

router.get('/agregarhorario', (req, res)=>{
    res.render("adminpantallas/agregarhorario", {});
})

router.get('/busquedausuarios', (req, res)=>{
    res.render("adminpantallas/busquedausuarios", {});
})

router.get('/editarhorario', (req, res)=>{
    res.render("adminpantallas/editarhorario", {});
})

router.get('/editarservicio', (req, res)=>{
    res.render("adminpantallas/editarservicio", {});
})

router.get('/resutadodecita', (req, res)=>{
    res.render("adminpantallas/resultadoCita", {});
})

router.get('/servicios', (req, res)=>{
    res.render("adminpantallas/servicios", {});
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