import express from "express";
import { subirArchivo } from "../controllers/archivosController.js"
import { auth } from "../middleware/auth.js"


const router = express.Router()

router.post('/', auth, subirArchivo)

export default router