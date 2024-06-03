import Usuario from "../models/Usuario.js"
import { validationResult } from "express-validator"

const nuevoUsuario = async(req, res) =>{

    // Mostrar mensajes de error de express validator
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }
    
    // Evitar registros duplicados
    const { email } = req.body
    const existeUsuario = await Usuario.findOne({email})
    
    if (existeUsuario) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({msg: error.message})
    }
    try {
        const usuario = new Usuario(req.body)
        await usuario.save()

        res.json({msg: 'Usuario creado correctamente'})
    } catch (error) {
        console.log(error)
    }
}


export{
    nuevoUsuario
}