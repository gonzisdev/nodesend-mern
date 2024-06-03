import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { FaUser } from "react-icons/fa";


const Header = () => {

  const { auth, cerrarSesionAuth } = useAuth({})

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
        <Link to={'/'}>
            <img className="w-64 mb-8 md:mb-0" src="/logo.svg" alt="Logo" />
        </Link>
        <div className="flex gap-2 text-center">
          {auth.nombre ? (
            <>
           <div className="flex flex-col bg-green-500 text-white rounded-lg px-5">
              <div className="flex items-center gap-1 justify-center"> {/* Container for CiUser and span */}
                <FaUser />
                <p className="font-bold">{auth.nombre}</p>
              </div>
              <p className="text-sm">{auth.email}</p>
            </div>
            <Link onClick={cerrarSesionAuth} className="bg-black hover:bg-gray-800 transition-colors px-5 py-3 rounded-lg text-white font-bold uppercase" to={'/'}>Cerrar sesión</Link>
            </>
          ): (
            <>
              <Link className="bg-red-500 hover:bg-red-700 transition-colors px-5 py-3 rounded-lg text-white font-bold uppercase mr-2" to={'/login'}>Iniciar sesión</Link>
              <Link className="bg-black hover:bg-gray-800 transition-colors px-5 py-3 rounded-lg text-white font-bold uppercase" to={'/crearcuenta'}>Crear cuenta</Link>
            </>
          )
          }

        </div>
    </header>
  )
}

export default Header