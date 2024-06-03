import express from "express";
import  { nuevoEnlace, obtenerEnlace, todosEnlaces, tienePassword, verificarPassword }  from "../controllers/enlacesController.js";
import { eliminarArchivo } from "../controllers/archivosController.js"
import { check } from "express-validator";
import { auth } from "../middleware/auth.js";


const router = express.Router()

router.post('/',
    [
        check('nombre', 'Sube un archivo').not().isEmpty(),
        check('nombre_original', 'Sube un archivo').not().isEmpty()
    ]
    , auth, nuevoEnlace)

router.get('/', todosEnlaces)

router.get('/:url', tienePassword, obtenerEnlace, eliminarArchivo)

router.post('/:url', verificarPassword, obtenerEnlace)

export default router