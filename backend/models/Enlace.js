import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const enlaceSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    nombre_original: {
        type: String,
        required: true,
    },
    descargas: {
        type: Number,
        default: 1
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',
        default: null
    },
    password:{
        type: String,
        default: null
    },
    creado: {
        type: Date,
        default: Date.now()
    }

})

enlaceSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        next()    
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


const Enlace = mongoose.model('Enlaces', enlaceSchema)

export default Enlace