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