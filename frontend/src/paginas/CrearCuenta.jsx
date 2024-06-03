import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Alerta from '../components/Alerta'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CrearCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
                .required('El nombre es obligatorio'),
      email: Yup.string()
                .email('El email no es válido')
                .required('El email es obligatorio'),
      password: Yup.string()
                .required('La contraseña es obligatoria')
                .min(6, 'La contraseña debe contener al menos 6 caracteres'),
    }),
    onSubmit: async valores => {
      try {
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/usuarios', valores);
        const msg = response.data.msg;
        setAlerta({
          msg: `${msg}`,
          error: false
        });
        setTimeout(() => {
          setAlerta({});
          navigate('/login');
        }, 3000);
    
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
        setTimeout(() => {
          setAlerta({});
        }, 3000);
      }
    }
  })

  const { msg } = alerta
  
  return (
    <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
      <h2 className="text-4xl font-sans font-bold text-gray-800 text-center">Crear cuenta</h2>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form 
            onSubmit={formik.handleSubmit}
            className="bg-white rounded-lg shadow-lg px-8 pt-6 pb-8 mb-4"
          >
            { msg && <Alerta alerta={alerta}/> }
            <div className="mb-4">
              <label 
                htmlFor="nombre"
                className="block text-black text-sm font-bold mb-2"
              >Nombre</label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                type="text" 
                id="nombre" 
                placeholder="Nombre de usuario"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.nombre && formik.errors.nombre ? (
                <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'>Error</p>
                    <p>{formik.errors.nombre}</p>
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label 
                htmlFor="email"
                className="block text-black text-sm font-bold mb-2"
              >Email</label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                type="text" 
                id="email" 
                placeholder="Email de usuario"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'>Error</p>
                    <p>{formik.errors.email}</p>
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label 
                htmlFor="password"
                className="block text-black text-sm font-bold mb-2"
              >Contraseña</label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                type="password" 
                id="password" 
                placeholder="Contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'>Error</p>
                    <p>{formik.errors.password}</p>
                </div>
              ) : null}
            </div>
            <input 
              className="bg-red-500 hover:bg-gray-800 transition-colors w-full p-2 text-white uppercase font-bold rounded-lg cursor-pointer"
              type="submit" 
              value="Crear cuenta" 
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default CrearCuenta