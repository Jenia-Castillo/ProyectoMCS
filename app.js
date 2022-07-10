//LLAMAMOS LA CLASE EXPRESS
const express = require('express');
//DENTRO DE UNA CONSTANTE ASIGNAMOS LA CLASE EXPRESS PARA USAR SUS FUNCIONES
const app = express();
//DEFINIMOS EL PUERTO
const port = 3000;
//VARIABLES DE ENTORNO
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
app.use(cookieParser())
//DEFINIMOS EL PATH DE LAS VARIABLES DE ENTORNO
dotenv.config({path: './env/.env'});
//MOTOR DE PLANTILLA PARA RENDERIZAR NUESTRAS PAGINAS
app.set('view engine', 'ejs');
//CAPTURAR DATOS DE FORMULARIOS
app.use(express.urlencoded({extended:false}));
app.use(express.json())
//app.use(express(json))

app.use((req, res, next)=>{
    if(!req.medico)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
})
app.use((req, res, next)=>{
    if(!req.paciente)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
})
app.use((req, res, next)=>{
    if(!req.admin)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
})
//DEFINIMOS LA CARPETA DONDE ESTARAN NUESTROS VIEWS
app.set('views', __dirname + '/Views');

//PARA PODER USAR CSS DEFINIMOS LA DIRECCION DE LA CARPETA DONDE ESTA / USE ES UN MIDDLEWARE
app.use(express.static(__dirname + "/Public"));

app.use('/', require('./Router/rutasmcs'));

//PAGINA DEFAULT SI EL USUARIO ACCEDE A UNA PAGINA NO DISPONIBLE
/*app.use((req, res, next) => {
    res.status(404).render("404", {
        error404: "La pagina no esta disponible",
        adver: "Vuelva a la anterior"
    });
})*/

//ESCUCHAMOS LA SOLICITUD
app.listen(port, ()=>{
    console.log('escuchando tu solicitud desde el puerto', port);
});