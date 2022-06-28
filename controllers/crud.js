const conn = require('../database/database')

//SERVICIOS
//INSERT
exports.guardar = (req, res)=>{
    const servicio = req.body.servicio;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    
    conn.query('insert into servicios set ?', {servicio, descripcion, precio}, (error, results)=>{
        if(error)throw error
        res.redirect('/servicios');
    })
}

/* ----- REGISTRO DE PACIENTES  ----------*/

exports.registrarpaciente = (req, res)=>{

    const correo=req.body.correo;
    const contrasena=req.body.contrasena;
    const nombre=req.body.nombre;
    const apellido=req.body.apellido;
    const cedula=req.body.cedula;
    const fechadenacimiento=req.body.fechadenacimiento;
    const sexo=req.body.sexo;
    const telefono=req.body.telefono;
    const direccion=req.body.direccion;
   
    conn.query('insert into pacientes set ?', {correo, contrasena,nombre,apellido,cedula,fechadenacimiento,sexo,telefono,direccion}, (error, results)=>{
        if(error)throw error
        res.redirect('/'); //arreglar el redirec
    })
    
}

/* ----- FIN REGISTRO DE PACIENTES  ----------*/

//UPDATE
exports.editar = (req, res)=>{

    const servicio = req.body.servicio;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;

    conn.query('UPDATE servicios set ? where servicio = ?', [{servicio,descripcion,precio}, servicio], (error, results)=>{
       
        if(error)throw error
        res.redirect('/servicios')

    })
}