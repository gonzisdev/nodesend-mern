import express from "express";
import  { autenticarUsuario, checkAuth }  from "../controllers/authController.js";
import { check } from "express-validator";
import { auth } from "../middleware/auth.js";

const router = express.Router()

router.post('/',
    [
        check('email', 'Introduce un email válido').isEmail(),
        check('password', 'La contraseña no puede estar vacía').not().isEmpty()
    ],
    autenticarUsuario)

router.get('/', auth, checkAuth )

export default router