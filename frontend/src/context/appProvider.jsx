import { useState, useEffect, createContext } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const AppContext = createContext()



const AppProvider = ({children}) => {

    const [alerta, setAlerta] = useState({})
    const [cargando, setCargando] = useState(false)
    const [url, setUrl] = useState('')
    const [password, setPassword] = useState('')
    const [descargas, setDescargas] = useState(1)
    const { auth } = useAuth()
    

    const mostrarAlerta = (msg, type) =>{
        setAlerta({
            msg: msg,
            error: type
        })
        setTimeout(() => {
            setAlerta({})
        }, 3000)
    }

    const crearEnlace = async (datos) => {
        const data = {
            nombre: datos.resSubida.data.archivo,
            nombre_original: datos.resForm.name
        }
        if (password) {
            data.password = password
        }
        if (descargas) {
            data.descargas = descargas
        }
        if (auth){
            data.usuario = auth
        }
        try {
            const resultado = await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/enlaces', data)
            setUrl(resultado.data.msg)
        } catch (error) {
            console.log(error)
        }
    };

    const agregarPassword = password => {
        setPassword(password);
    }

    const agregarDescargas = descargas => {
        setDescargas(descargas);
    }


    return(
        <AppContext.Provider
            value={{
                alerta,
                mostrarAlerta,
                cargando,
                setCargando,
                crearEnlace,
                url,
                setUrl,
                agregarPassword,
                agregarDescargas
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export{
    AppProvider
}


export default AppContext