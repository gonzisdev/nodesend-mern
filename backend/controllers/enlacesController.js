import Enlace from "../models/Enlace.js"
import { validationResult } from "express-validator"
import { uid } from 'uid'
import bcrypt from 'bcrypt'

const nuevoEnlace = async (req, res, next) => {

    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    const { nombre_original, nombre } = req.body

    const enlace = new Enlace()
    enlace.url = uid()
    enlace.nombre = nombre
    enlace.nombre_original = nombre_original
    enlace.descargas = 1
    
    if(req.body.usuario._id){
        enlace.descargas = req.body.descargas
        if (req.body.password) {
            enlace.password = req.body.password
        }
        
        enlace.autor = req.body.usuario._id
    }

    try {
        await enlace.save()
        return res.json({msg: `${enlace.url}`})
    } catch (error) {
        console.log(error)
    }
}

const obtenerEnlace = async (req, res, next) => {
    let enlace

    if (req.body.url) {
        enlace = await Enlace.findOne({url: req.body.url}).select('-__v')
    } else {
        enlace = await Enlace.findOne({url: req.params.url}).select('-__v')
    }
     console.log(enlace);
    
    if (!enlace) {
        res.status(404).json({msg: 'Ese enlace no existe'})
        return next()
    }

    res.json({archivo: enlace.nombre})

    if (enlace.descargas === 1) {
        req.archivo = enlace.nombre
        await Enlace.findOneAndDelete(req.params.url)
        next()
    } else {
        enlace.descargas--
        await enlace.save()
    }
}

const todosEnlaces = async (req, res) => {
    try {
        const enlaces = await Enlace.find({}).select('url -_id')
        res.json({enlaces})
    } catch (error) {
        console.log(error)
    }
}

const tienePassword = async (req, res, next) =>{
    const enlace = await Enlace.findOne({url: req.params.url}).select('-__v')

    if (!enlace) {
        res.status(404).json({msg: 'Ese enlace no existe'})
        return next()
    }

    if (enlace.password) {
        return res.json({password: true, enlace: enlace.url})
    }
    next()
}

const verificarPassword = async(req, res, next) => {
    console.log(req.body);
    const { url, password } = req.body
    const enlace = await Enlace.findOne({url})

    if (bcrypt.compareSync(password, enlace.password)) {
        next()
    } else {
        return res.status(401).json({msg: 'Contraseña incorrecta'})
    }
}


export{
    nuevoEnlace,
    obtenerEnlace,
    todosEnlaces,
    tienePassword,
    verificarPassword
}