import { useState, useEffect, createContext } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()



const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const navigate = useNavigate('/')

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/auth', config)
                setAuth(data)
            } catch (error) {
                setAuth({})
            }
        }
        autenticarUsuario()
        
    }, [])

    const cerrarSesionAuth = () => {
        localStorage.removeItem('token');
        setAuth({})
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export{
    AuthProvider
}


export default AuthContext