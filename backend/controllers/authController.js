import Usuario from "../models/Usuario.js"
import { validationResult } from "express-validator"
import generarJWT from "../helpers/generarJWT.js"

const autenticarUsuario = async(req, res) =>{

    // Mostrar mensajes de error de express validator
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    const { email, password } = req.body

    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({email})
    if (!usuario) {
        const error = new Error('El usuario no existe')
        return res.status(404).json({msg: error.message})
    }

    // Comprobar contraseña
    if (await usuario.comprobarPassword(password)) {
        res.json({
           _id: usuario._id,
           nombre: usuario.nombre,
           email: usuario.email,
           token: generarJWT(usuario._id)
        })
    } else{
        const error = new Error('La contraseña es incorrecta')
        return res.status(403).json({msg: error.message})
    }
}

const checkAuth = async (req, res, next) => {
    res.json(req.usuario);

}


export{
    autenticarUsuario,
    checkAuth
}