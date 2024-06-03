import { useDropzone } from "react-dropzone"
import { useCallback, useState } from "react"
import axios from "axios"
import useApp from "../hooks/useApp"
import useAuth from "../hooks/useAuth"
import Formulario from "./Formulario"

const Dropzone = () => {
	const { mostrarAlerta, setCargando, cargando, crearEnlace } = useApp();
	const [datos, setDatos] = useState({})
	const { auth } = useAuth()

	const onDropRejected = () => {
		mostrarAlerta(
			"Solo los usuarios registrados pueden subir archivos superiores a 1.00 MB",
			true
		);
	};

	const onDropAccepted = useCallback(async (acceptedFiles) => {
		setCargando(true);
		const formData = new FormData();
		formData.append("archivo", acceptedFiles[0])
		const resultado = await axios.post(
			import.meta.env.VITE_BACKEND_URL + "/api/archivos",
			formData
		);
		const uniondatos = {
			resSubida: resultado,
			resForm: acceptedFiles[0]
		}
			setDatos(uniondatos)
		setCargando(false);
	}, []);

	const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
		useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

	const archivos = acceptedFiles.map((archivo) => (
		<li
			key={archivo.lastModified}
			className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
		>
			<p className="font-bold text-xl">{archivo.path}</p>
			<p className="text-sm text-center">
				{(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB
			</p>
		</li>
	));


	return (
		<>
			<div className="md:flex-1 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100">
				{acceptedFiles.length > 0 ? (
					<div className="w-full py-12 px-6">
						<ul>{archivos}</ul>

						{
							auth._id ? <Formulario /> : 'Enlace de un solo uso y límite de 1.00 MB para usuarios no registrados.'
						}

						{cargando ? <p className="text-2xl text-center text-gray-600">
								Subiendo el archivo...
							</p> :(
							<button
								type="button"
								className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
								onClick={() => crearEnlace(datos)}
							>
								Crear enlace
							</button>
						)}
					</div>
				) : (
					<div className="dropzone w-full py-32 px-6" {...getRootProps()}>
						<input className="h-100" {...getInputProps()} />

						{isDragActive ? (
							<p className="text-2xl text-center text-gray-600">
								Suélta el archivo
							</p>
						) : (
							<div className="text-center">
								<p className="text-2xl text-center text-gray-600">
									Selecciona un archivo y arrástralo aquí...
								</p>
								<button
									className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
									type="button"
								>
									...o búscalo en tu ordenador
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default Dropzone;
