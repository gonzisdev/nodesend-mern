import multer from 'multer'
import { uid } from 'uid'
import fs from 'fs'


const subirArchivo = async (req, res, next) => {

    const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads');
        },
        filename: (req, file, cb) => {
            const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            cb(null, `${uid()}${extension}`);
        }
    })

    const configuracionMulter = {
        limits: { fileSize: req.usuario ? 10000000 : 1000000 },
        storage: fileStorage
    }

    const upload = multer(configuracionMulter).single('archivo')

    upload(req, res, async (error) => {

        if (!error) {
            res.json({archivo: req.file.filename})
        } else {
            console.log(error)
            return next()
        }
    })
    
}


const eliminarArchivo = async (req, res) => {
    try {
        fs.unlinkSync(`./uploads/${req.archivo}`)
    } catch (error) {
        console.log(error)
    }
}


export {
    subirArchivo,
    eliminarArchivo
}