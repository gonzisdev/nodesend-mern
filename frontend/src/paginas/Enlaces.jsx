import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { saveAs } from 'file-saver'
import useApp from "../hooks/useApp";
import Alerta from "../components/Alerta"

const Enlaces = () => {
  const [enlace, setEnlace] = useState([]);
  const [tienePass, setTienePass] = useState(false);
  const [urlPass, setUrlPass] = useState('');
  const [password, setPassword] = useState('');
  const url = useParams()
  const urlQuery = url.url
  const { mostrarAlerta, alerta } = useApp()

  useEffect(() => {
    const obtenerEnlace = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/enlaces/"+urlQuery
        );
        if (response.data.archivo) {
          setEnlace(response.data.archivo);
        } else {
          setTienePass(true)
          setUrlPass(response.data.enlace)
        }
        
      } catch (error) {
        console.error("Error al obtener enlaces:", error);
      }
    };

    obtenerEnlace();
  }, []); 
  
  const handleDownload = () => {
    saveAs(enlace, enlace); 
  };

  const verificarPassword = async e => {
    e.preventDefault()
    const data = {
      password,
      url: urlPass
    }

    try {
      const resultado = await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/enlaces/'+{urlPass}, data)
      setEnlace(resultado.data.archivo);
      setTienePass(false)
      setUrlPass('')
    } catch (error) {
      mostrarAlerta(error.response.data.msg, true)
    }

  }

  const { msg } = alerta

  return (

    <div className="flex flex-col gap-10 mt-4 items-center">

        <h1 className="text-4xl text-center text-gray-700 font-bold">Descarga tu archivo:</h1>
        
        {
          tienePass ? (
            <>
              <p>Este archivo está protegido con una contraseña:</p>
               
              <div className="w-full max-w-lg">
              {msg && <Alerta alerta={alerta}/> }
                <form 
                  onSubmit={e => verificarPassword(e)}
                  className="bg-white rounded-lg shadow-lg px-8 pt-6 pb-8 "
                >
                  <div className="mb-4">
                    <label 
                      htmlFor="password"
                      className="block text-black text-sm font-bold mb-2"
                    >Contraseña</label>
                    <input 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                      type="password" 
                      id="password" 
                      placeholder="Introduce la contraseña"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                    <input 
                      className="bg-red-500 hover:bg-gray-800 transition-colors w-full p-2 text-white uppercase font-bold rounded-lg cursor-pointer"
                      type="submit" 
                      value="Validar Contraseña" 
                    />
                </form>
              </div>
            </>
          ) : (
          <div className="flex items-center justify-center mt-">
            <button onClick={handleDownload} className="bg-red-500 hover:bg-red-700 transition-colors px-10 py-3 rounded-lg text-white font-bold uppercase cursor-pointer">
              Descarga Aquí
            </button>        
          </div>
          )
        }
        

    </div>
  );
};

export default Enlaces;