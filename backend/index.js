import express from "express"
import dotenv from "dotenv"
import conectarDB from "./config/db.js"
import usuarioRoutes from './routes/usuarioRoutes.js'
import authRoutes from './routes/authRoutes.js'
import enlacesRoutes from './routes/enlacesRoutes.js'
import archivosRoutes from './routes/archivosRoutes.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(express.static('uploads'))


dotenv.config()

conectarDB()

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL ]
const corsOptions = {
    origin: function(origin, callback){
        if(!origin || whitelist.includes(origin)){
            // Puede consultar la API
            callback(null, true)
        }else{
            // No esta permitido
            callback(new Error('Error de CORS') )
        }
        
    }
}


app.use(cors(corsOptions))
 //app.use(cors())

const port = process.env.PORT || 4000


// Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/enlaces', enlacesRoutes)
app.use('/api/archivos', archivosRoutes)

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})