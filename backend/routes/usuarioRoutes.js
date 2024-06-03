import express from "express";
import { nuevoUsuario } from "../controllers/usuarioController.js";
import { check } from "express-validator";

const router = express.Router()

router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email no es válido').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
        
    ], 
    nuevoUsuario)

export default router