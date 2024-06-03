import jwt from "jsonwebtoken"
import Usuario from "../models/Usuario.js"

const auth = async (req, res, next) => {
    const authHeader = req.get('Authorization')

    if (authHeader) {
        
            const token = authHeader.split(' ')[1] 

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                const usuario = await Usuario.findById(decoded.id).select("-__v")
                req.usuario = usuario
            } catch (error) {
                return res.status(404).json({msg: 'Token no válido'})
            }      
        } 
        return next()
}

export {
    auth
}